import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import {db} from "./database.ts";

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
    db.query('SELECT * FROM cuties', (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error getting cuties');
        }
        res.status(200).json(results);
    });
});

app.post('/createcutie', (req, res) => {
    const name = req.body.name;
    if (!name || !name.trim()) {
        res.status(400).send("Name is required");
        return
    }
    db.query('INSERT INTO cuties (name) VALUES (?)', [name], (err) => {
        if (err) {
            return res.status(500).send('Error creating cutie');
        }
        res.status(201).send('done >///<');
    });
})


    app.listen(port, () => {
        console.log(`love ayaka on: http://localhost:${port}`);
    });






