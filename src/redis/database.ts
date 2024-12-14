import {createClient} from 'redis';
import {config} from "dotenv";

config()
export const client = createClient({
    username: process.env.REDIS_DATABASE_USERNAME,
    password: process.env.REDIS_DATABASE_PASSWORS,
    socket: {
        host: process.env.REDIS_DATABASE_HOST,
        port: parseInt(process.env.REDIS_DATABASE_PORT!)
    }
});

client.on('error', err => console.log('Redis Client Error', err));


// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

