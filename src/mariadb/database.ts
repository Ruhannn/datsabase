import mariadb from 'mariadb'

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'user_password',
  database: 'cuties',
  connectionLimit: 5,
})
await pool.execute(`CREATE TABLE IF NOT EXISTS cuties (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)

export const conn = await pool.getConnection()
