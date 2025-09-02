import oracledb from 'oracledb'

export const connection = await oracledb.getConnection({
  user: 'system',
  password: 'password',
  connectString: 'localhost:1521/FREEPDB1',
})
