import { createPool } from 'mysql2/promise'

const DATABASE_CONFIG = {

  host: 'localhost',
  port: 3306, // Puerto definido al crear la base de datos, por defect 3306
  user: 'root', // usuario al crear la base de datos
  password: '',
  database: 'rentacarDb' // nombre de la base de datos creada

}

export const pool = createPool(DATABASE_CONFIG)
