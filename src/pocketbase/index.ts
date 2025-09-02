import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { collection } from './database.ts'

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
  const allCuties = await collection.getFullList()
  res.status(200).send(allCuties.sort((a, b) => a.createdAt - b.createdAt))
})

app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  await collection.create({
    name,
    _id: Math.floor(Math.random() * 1000),
  })

  res.status(201).send('>////<')
})

app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
