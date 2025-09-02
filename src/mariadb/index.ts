import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { kamiLogger } from 'kami-logger'
import { conn } from './database'

config()

const app = express()

const port = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(kamiLogger({
  isMongoose: true,
}))

app.get('/', (req, res) => {
  res.send('K 😊')
})

app.get('/cuties', async (req, res) => {
  const allCuties = await conn.execute('SELECT * FROM cuties')
  res.status(200).json(allCuties)
})

app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  await conn.execute('INSERT INTO cuties (name) VALUES (?)', [name])
  res.status(201).send('done >///<')
})

app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
