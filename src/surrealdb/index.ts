import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { kamiLogger } from 'kami-logger';
import db from './config';



config();

const app = express();

const port = process.env.PORT || 5000;


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(kamiLogger())

app.get('/', (req, res) => {
    res.send('i love ayaka 😊');
});

app.get('/cuties', async (req, res) => {
    const cuties = await db.select('cuties');
    res.status(200).json(cuties);
});

app.post('/createcutie', async (req, res) => {
    const name = req.body.name;
    if (!name || !name.trim()) {
        res.status(400).send("Name is required");
        return
    }
    try {
        await db.create('cuties', { name, createdAt: new Date() });

        res.status(201).send("done >///<");
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to create cutie');
    }

})

app.listen(port, () => {
    console.log(`love ayaka on: http://localhost:${port}`);
});






