import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { kamiLogger } from 'kami-logger'
import client from './config'

config()

const app = express()

const port = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(kamiLogger())

app.get('/', (req, res) => {
  res.send('K 😊')
})

app.get('/cuties', async (req, res) => {
  const result = await client.query('SELECT * FROM cuties')

  res.status(200).json(result.rows)
})

app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  try {
    await client.query('INSERT INTO cuties (name) VALUES ($1) RETURNING *', [name])
    res.status(201).send('done >///<')
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Failed to create cutie')
  }
})

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`love k on: http://localhost:${port}`)
  })
})
