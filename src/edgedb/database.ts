import {createClient} from "edgedb";
import {config} from "dotenv";
config()
export const client = createClient({
    instanceName: process.env.EDGEDB_INSTANCENAME,
    secretKey:process.env.EDGEDB_SECRETKEY
});