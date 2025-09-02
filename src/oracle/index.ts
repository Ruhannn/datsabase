import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { connection } from './database.ts'

config()

const app = express()

const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('K 😊')
})

app.get('/cuties', async (req, res) => {
  const allCuties = await connection.execute(`select * from cuties`)
  res.status(200).send(allCuties.rows?.map((cutie) => {
    const c = cutie as any[]
    return { id: c[0], name: c[1], createdAt: c[2] }
  }))
})

app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  await connection.execute(
    `INSERT INTO cuties (name) VALUES (:name)`,
    { name: name.trim() },
    { autoCommit: true },
  )

  res.status(201).send('>////<')
})

app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
