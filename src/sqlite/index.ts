import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {config} from 'dotenv';
import {db} from "./database.ts";


config();

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

db.run(
    `CREATE TABLE IF NOT EXISTS cuties
     (
         _id
         INTEGER
         PRIMARY
         KEY
         AUTOINCREMENT,
         name
         TEXT
         NOT
         NULL,
         createdAt
         TEXT
         DEFAULT
         CURRENT_TIMESTAMP
     )`,
    (err) => {
        if (err) {
            console.error(err.message);
        }
    }
);
app.get('/', (req, res) => {
    res.send('i love ayaka 😊');
});

app.get('/cuties', async (req, res) => {
    db.all('SELECT _id, name, createdAt FROM cuties', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Failed to get cuties');
        }
        res.status(200).json(rows);
    });
});


app.post('/createcutie', (req, res) => {
    const name = req.body.name;
    if (!name || !name.trim()) {
        res.status(400).send("Name is required");
        return;
    }

    db.run(
        `INSERT INTO cuties (name)
         VALUES (?)`,
        [name],
        function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send('Failed to create cutie');
            }

            res.status(201).send(">////<");
        }
    );
});


app.listen(port, () => {
    console.log(`love ayaka on: http://localhost:${port}`);
});






