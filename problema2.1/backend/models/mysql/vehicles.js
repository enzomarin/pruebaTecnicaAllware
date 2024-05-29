import { pool } from '../../config/db.js'

export class VehicleModel {
  static async getAll () {
    const [vehicles] = await pool.query('SELECT * FROM vehicles ORDER BY id DESC LIMIT 10;')

    return vehicles
  }

  static async addVehicle ({ data }) {
    const {
      rut,
      name,
      patent,
      brand,
      model,
      price
    } = data
    try {
      console.log(data)
      const result = await pool.query('INSERT INTO vehicles (rut, name, patent, brand, model, price) VALUES (?,?,?,?,?,?)', [rut, name, patent, brand, model, price])
      const [{ insertId }] = result
      const [vehicle] = await pool.query('SELECT * FROM vehicles WHERE id=?;', [insertId])
      return vehicle[0]
    } catch (error) {
      throw new Error(error)
    }
  }

  static async deleteVehicle ({ id }) {
    try {
      const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?;', [id])
      if (result.affectedRows === 0) return false

      return true
    } catch (error) {
      throw new Error(error)
    }
  }
}
