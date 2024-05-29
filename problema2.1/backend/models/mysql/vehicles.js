import { pool } from '../../config/db.js'

export class VehicleModel {
  // Metodo estático para obtener los últimos 10 vehículos ordenados por id descendente
  static async getAll () {
    const [vehicles] = await pool.query('SELECT * FROM vehicles ORDER BY id DESC LIMIT 10;')

    return vehicles
  }

  // Método para agregar un nuevo vehículo a la base de datos
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
      // Insertar los datos del vehículo en la base de datos
      const result = await pool.query('INSERT INTO vehicles (rut, name, patent, brand, model, price) VALUES (?,?,?,?,?,?)', [rut, name, patent, brand, model, price])
      const [{ insertId }] = result
      // Obtener el vehículo recién insertado
      const [vehicle] = await pool.query('SELECT * FROM vehicles WHERE id=?;', [insertId])
      return vehicle[0]
    } catch (error) {
      throw new Error(error)
    }
  }

  // Método  para eliminar un vehículo por su id
  static async deleteVehicle ({ id }) {
    try {
      const [result] = await pool.query('DELETE FROM vehicles WHERE id = ?;', [id])

      // Verificamos si se eliminó correctamente (affectedRows debe ser mayor que 0)
      if (result.affectedRows === 0) return false

      return true
    } catch (error) {
      throw new Error(error)
    }
  }
}
