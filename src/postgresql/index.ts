import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import {sql} from "./database.ts";



config();

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('i love ayaka 😊');
});

app.get('/cuties', async (req, res) => {
    try {
        const result = await sql`SELECT *
                                 FROM cuties`;
        res.json(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(500).send('Error getting cuties.');
    }

});

app.post('/cratecutie', async (req, res) => {
    const name = req.body.name;
    if (!name || !name.trim()) {
        res.status(400).send("Name is required");
        return
    }
    try {
        await sql`INSERT INTO cuties (name)
                  VALUES (${name}) RETURNING *`;
        res.status(201).send('done >///<');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(500).send('Error creating cuties.');
    }
})


app.listen(port, () => {
    console.log(`love ayaka on: http://localhost:${port}`);
});






