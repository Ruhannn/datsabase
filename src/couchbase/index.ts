import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { bucket, cluster, collection } from './databast.ts'

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
  const query = `SELECT * FROM \`${bucket.name}\` ORDER BY createdAt ASC`
  const result = await cluster.query(query)
  const allCuties = result.rows.map(row => row[bucket.name])
  res.status(200).json(allCuties.sort((a, b) => a.createdAt - b.createdAt))
})
//
app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  const _id = `cutie:${Date.now()}`
  const createdAt = new Date().toISOString()

  const cutie = {
    _id,
    name,
    createdAt,
  }

  await collection.upsert(_id, cutie)
  res.status(201).send('done >///<')
})

app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
