import { validateVehicle } from '../schemas/vehicle.js'

export class VehicleController {
  constructor ({ vehicleModel }) {
    this.vehicleModel = vehicleModel
  }

  // Controlador para obtener todos los vehículos
  getVehicles = async (req, res) => {
    try {
      const vehicles = await this.vehicleModel.getAll() // Llamamos al modelo y asu metodo getAll()
      res.status(200).json(vehicles)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor', message: error.message })
    }
  }

  // Controlador para agregar un nuevo vehículo
  addVehicles = async (req, res) => {
    const result = validateVehicle(req.body) // Validamos los datos
    if (!result.success) { // Si los datos no son correctos retornamos un mensaje
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try { // si los datos son correctos
      const vehicle = await this.vehicleModel.addVehicle({ data: result.data }) // Llamamos al modelo para agregar un nuevo vehículo
      res.status(201).json(vehicle) // Retornamos el vehículo
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Error interno del servidor', message: error.message })
    }
  }

  // Controlador para eliminar un vehículo
  delete = async (req, res) => {
    try {
      const id = req.params.id // recuperamos el id de los parametros de la request
      const result = await this.vehicleModel.deleteVehicle({ id }) // Llamamos al modelo y le pasamos el id del vehículo a eliminar
      if (!result) return res.status(404).json({ message: 'Vehiculo no encontrado' }) // si no se encuentra retornamos un mensaje
      res.status(204).json({ message: 'Vehiculo borrado' })
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del serivod al eliminar un vehículo' })
    }
  }
}
