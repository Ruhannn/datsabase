import Valkey from 'iovalkey'

export const client = new Valkey({
  host: 'localhost',
  port: 6379,
})
