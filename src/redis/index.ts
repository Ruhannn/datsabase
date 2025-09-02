import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { client } from './database.ts'

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
    const keys = await client.keys('cutie:*')
    const cuties = []

    for (const key of keys) {
      const cutie = await client.hGetAll(key)
      cuties.push({
        _id: Number(cutie._id),
        name: cutie.name,
        createdAt: new Date(cutie.createdAt),
      })
    }
    res.json(cuties.sort((a, b) => a._id - b._id))
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
    const _id = await client.incr('cutie_id')
    const createdAt = new Date().toISOString()
    const cutieKey = `cutie:${_id}`
    await client.hSet(cutieKey, {
      _id: _id.toString(),
      name,
      createdAt,
    })

    res.status(201).send('done >///<')
  }
  catch (error) {
    console.error(error)
    res.status(500).send('Error creating cuties.')
  }
})

await client.connect()
  .then(() => console.log('Connected to Redis!'))
  .catch(err => console.error('Redis connection error:', err))
app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
