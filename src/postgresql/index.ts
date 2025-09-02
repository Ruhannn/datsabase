import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { sql } from './database.ts'

config()

const app = express()

const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('K 😊')
})

app.get('/cuties', async (req, res) => {
  try {
    const result = await sql`SELECT *  FROM cuties`
    res.json(result)
  }
  catch (error) {
    console.error(error)
    res.status(500).send('Error getting cuties.')
  }
})

app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  try {
    await sql`INSERT INTO cuties (name) VALUES (${name}) RETURNING *`
    res.status(201).send('done >///<')
  }
  catch (error) {
    console.error(error)
    res.status(500).send('Error creating cuties.')
  }
})

app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
