import { createPool } from 'mysql2/promise'

const DATABASE_CONFIG = {

  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'rentacarDb'

}

export const pool = createPool(DATABASE_CONFIG)
