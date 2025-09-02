import { DuckDBInstance } from '@duckdb/node-api'

const instance = await DuckDBInstance.create('duckdb.db', {
  threads: '4',
})

const connection = await instance.connect()

await connection.run(`
    CREATE SEQUENCE IF NOT EXISTS cutie_id_seq START 1
  `)

await connection.run(`
    CREATE TABLE IF NOT EXISTS cuties (
      id INTEGER DEFAULT nextval('cutie_id_seq') PRIMARY KEY,
      name VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
// await connection.run(`
//     INSERT INTO cuties (name) VALUES ('Fluffy')
//   `)
// const r = await connection.run(`
//    SELECT * FROM cuties
//   `)
// console.log(await r.getRowObjectsJson())

export default connection
