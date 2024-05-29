import { Router } from 'express'
import { VehicleController } from '../controllers/vehiclesController.js'

export const createVehicleRouter = ({ vehicleModel }) => {
  const vehicleController = new VehicleController({ vehicleModel })
  const useRouter = Router()

  useRouter.get('/vehicles', vehicleController.getVehicles)
  useRouter.post('/vehicles', vehicleController.addVehicles)
  useRouter.delete('/vehicles/:id', vehicleController.delete)
  return useRouter
}
