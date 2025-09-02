import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { kamiLogger } from 'kami-logger'
import { session } from './database'

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
  const result = await session.run('MATCH (c:Cutie) RETURN c')
  const allCuties = result.records.map((r) => {
    const node = r.get('c')
    return {
      id: node.elementId,
      name: node.properties.name,
      created_at: node.properties.created_at.toString(),
    }
  })
  res.status(200).json(allCuties)
})

app.post('/createcutie', async (req, res) => {
  const name = req.body.name
  if (!name || !name.trim()) {
    res.status(400).send('Name is required')
    return
  }
  await session.run(
    'CREATE (c:Cutie {name: $name, created_at: datetime()}) RETURN c',
    { name },
  )
  res.status(201).send('done >///<')
})

app.listen(port, () => {
  console.log(`love k on: http://localhost:${port}`)
})
