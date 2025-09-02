import type { DocumentScope } from 'nano'
import nano from 'nano'

const couch = nano('http://admin:admin_password@localhost:5984')
const dbName = 'cuties'
// await couch.db.create(dbName)
export const db: DocumentScope<{
  name: string
  created_at: string
}> = couch.db.use(dbName)
