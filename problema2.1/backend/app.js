import express, { json } from 'express'

import cors from 'cors'
import { createVehicleRouter } from './routes/vehicles.js'
import { VehicleModel } from './models/mysql/vehicles.js'

const PORT = 1234
const app = express()
app.use(cors())
app.use(json()) // middleware para mutar el req.body
app.get('/', (req, res) => {
  res.status(200).send('<h1>Vehicles</h1>')
})
app.use('/api', createVehicleRouter({ vehicleModel: VehicleModel }))

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error de servidor:', err)
  res.status(500).json({ message: 'Error interno del servidor' })
})

// .use para todos los metodos (get, post, etc...)
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
