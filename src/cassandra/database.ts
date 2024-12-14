import { DataAPIClient } from "@datastax/astra-db-ts";

interface Cutie {
    _id: string,
    name: string,
    createdAt: Date,
}

// Initialize the client
const client = new DataAPIClient(process.env.CASSANDRA_TOKEN);
const db = client.db(process.env.CASSANDRA_URL!);
export const collection = db.collection<Cutie>("cuties")