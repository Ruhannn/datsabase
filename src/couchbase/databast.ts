import couchbase from 'couchbase'
import { config } from 'dotenv'

config()

export const cluster = await couchbase.connect(process.env.COUCHBASE_URL!, {
  username: process.env.COUCHBASE_NAME,
  password: process.env.COUCHBASE_PASSWORD,
})
export const bucket = cluster.bucket(process.env.COUCHBASE_BUCKET!)
export const collection = bucket.defaultCollection()
