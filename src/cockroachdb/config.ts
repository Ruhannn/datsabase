import { config } from 'dotenv';
import { Client } from "pg";
config()

const client = new Client(process.env.COCKROACH_DATABASE_URL);

export default client;
