import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { kamiLogger } from 'kami-logger'
import { connectToDatabase } from './config.ts'
import { Cutie } from './schema.ts'

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
  const allCuties = await Cutie.find().sort()
  res.status(200).json(allCuties)
})

app.post('/createcutie', (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  const newCutie = new Cutie({
    name,
  })
  newCutie.save()
  res.status(201).send('done >///<')
})

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`love k on: http://localhost:${port}`)
  })
})
