import { Router } from 'express'
import { VehicleController } from '../controllers/vehiclesController.js'

// Función para crear un enrutador de vehículos
export const createVehicleRouter = ({ vehicleModel }) => {
  const vehicleController = new VehicleController({ vehicleModel }) // Crear una instancia del controlador de vehículos con el modelo proporcionado

  const useRouter = Router()

  // Rutas para manejar las operaciones CRUD de los vehículos
  useRouter.get('/vehicles', vehicleController.getVehicles) // Endpoint para obtener todos los vehículos
  useRouter.post('/vehicles', vehicleController.addVehicles) // Endpoint para agregar un nuevo vehículo
  useRouter.delete('/vehicles/:id', vehicleController.delete)// Endpoint para eliminar un vehículo por su id
  return useRouter // Devolvemos el enrutador ya configurao
}
