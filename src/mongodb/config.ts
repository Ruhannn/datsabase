import mongoose from "mongoose";
import {config} from 'dotenv';
import {mongoOptions} from "./util/mongoOptions.ts";

config();
const isLocal = false

export const connectToDatabase = async () => {
    const firstUrl = isLocal ? "mongodb" : "mongodb+srv";
    const dbHost = isLocal ? "localhost" : process.env.DATABASE_HOST; // '127.0.0.1' or host name for MongoDB Atlas
    const dbPort = isLocal ? 27017 : "mongodb.net";
    const dbName = isLocal ? process.env.LOCAL_DATABASE_NAME : process.env.DATABASE_NAME;
    const dbUser = isLocal ? process.env.LOCAL_DATABASE_USER : process.env.DATABASE_USER;
    const dbPassword = isLocal ? process.env.LOCAL_DATABASE_USER_PASSWORD : process.env.DATABASE_USER_PASSWORD;

    const options = mongoOptions({
        authSource: isLocal ? "admin" : undefined,
        retryWrites: isLocal ? undefined : "true",
        w: isLocal ? undefined : "majority"
    });
    const connectionString = `${firstUrl}://${dbUser}:${encodeURIComponent(
        dbPassword!,
    )}@${dbHost}${isLocal ? ":" : "." + dbPort}/${dbName}?${options}`;

    try {
        console.log(connectionString);
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        // process.exit(1);
    }
};
