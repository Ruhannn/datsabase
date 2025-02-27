import { config } from "dotenv";
import { Surreal } from "surrealdb";
const db = new Surreal();
config()

await db.connect(process.env.SURREALDB_CONNECTION_URL!, {
    namespace: process.env.SURREALDB_NAMESPACE,
    database: process.env.SURREALDB_DATABASE,
    auth: {
        username: process.env.SURREALDB_USER!,
        password: process.env.SURREALDB_PASSWORD!,
    },
})

export default db;
