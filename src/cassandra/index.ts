import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {config} from 'dotenv';
import {collection} from "./database.ts";


config();

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('i love ayaka 😊');
});

app.get('/cuties', async (req, res) => {
    const allCuties = await collection.find({}).sort({
        createdAt: 1
    }).toArray()
    res.status(200).json(allCuties);
});

app.post('/createcutie', async (req, res) => {
    const name = req.body.name;
    if (!name || !name.trim()) {
        res.status(400).send("Name is required");
        return
    }
    await collection.insertOne({
        name: name,
        createdAt: new Date(),
    })
    res.status(201).send("done >///<");
})


app.listen(port, () => {
    console.log(`love ayaka on: http://localhost:${port}`);
});






