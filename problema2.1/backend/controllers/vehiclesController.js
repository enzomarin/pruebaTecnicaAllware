import { validateVehicle } from '../schemas/vehicle.js'

export class VehicleController {
  constructor ({ vehicleModel }) {
    this.vehicleModel = vehicleModel
  }

  getVehicles = async (req, res) => {
    try {
      const vehicles = await this.vehicleModel.getAll()
      res.status(200).json(vehicles)
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del servidor', message: error.message })
    }
  }

  addVehicles = async (req, res) => {
    const result = validateVehicle(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const vehicle = await this.vehicleModel.addVehicle({ data: result.data })
      res.status(201).json(vehicle)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Error interno del servidor', message: error.message })
    }
  }

  delete = async (req, res) => {
    try {
      const id = req.params.id
      const result = await this.vehicleModel.deleteVehicle({ id })
      if (!result) return res.status(404).json({ message: 'Vehiculo no encontrado' })
      res.status(204).json({ message: 'Vehiculo borrado' })
    } catch (error) {
      return res.status(500).json({ error: 'Error interno del serivod al eliminar un vehículo' })
    }
  }
}
