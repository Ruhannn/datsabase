import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { db } from './database'

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
  const snapshot = await db.get()
  const allCuties = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      name: doc.data().name,
      created_at: doc.createTime.toDate(),
    }
  })
  res.status(200).send(allCuties)
})

app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  await db.add({
    name,
  })

  res.status(201).send('>////<')
})

app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
