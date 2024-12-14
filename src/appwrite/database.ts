import {Client, Databases} from 'node-appwrite';

const client = new Client().setEndpoint(process.env.APPWRITE_ENDPOINT!).setProject(process.env.APPWRITE_PROJECT!).setKey(process.env.APPWRITE_KEY!)

export const databases = new Databases(client);
