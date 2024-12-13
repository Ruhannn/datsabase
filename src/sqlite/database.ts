import {verbose} from "sqlite3";
const sqlite3 = verbose();
export const db = new sqlite3.Database('./src/sqlite/hm.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
