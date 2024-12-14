import {databases} from "./database.ts";


import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {config} from 'dotenv';


config();

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
const databaseId = process.env.APPWRITE_DATABASE_ID!;
const collectionId = process.env.APPWRITE_COLLECTION_ID!;

app.get('/', (req, res) => {
    res.send('i love ayaka 😊');
});

app.get('/cuties', async (req, res) => {
    const allCuties = await databases.listDocuments(databaseId, collectionId);
    const simpleCuties = allCuties.documents.map((user) => {
        return {
            name: user.name,
            createdAt: user.createdAt,
            _id: user.$id
        };
    });
    res.status(200).json(simpleCuties);
});

app.post('/createcutie', async (req, res) => {
    const name = req.body.name;
    if (!name || !name.trim()) {
        res.status(400).send("Name is required");
        return
    }
    const newCutie = {
        name: name,
        createdAt: new Date().toDateString()
    };
    await databases.createDocument(databaseId, collectionId, 'unique()', newCutie);
    res.status(201).send("done >///<");
})


app.listen(port, () => {
    console.log(`love ayaka on: http://localhost:${port}`);
});
