import express, { json } from 'express'

import cors from 'cors'
import { createVehicleRouter } from './routes/vehicles.js'
import { VehicleModel } from './models/mysql/vehicles.js'

const PORT = 1234 // Puerto donde se levanta el servidor
const app = express()
app.use(cors()) // Middleware para parsear el cuerpo de las solicitudes a JSON

app.use(json()) // middleware para mutar el req.body
app.get('/', (req, res) => { // ruta de testeo para verificar conexión
  res.status(200).send('<h1>Vehicles</h1>')
})
// Ruta específica para manejar los endpoints relacionados con los vehículos
app.use('/api', createVehicleRouter({ vehicleModel: VehicleModel }))

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error de servidor:', err)
  res.status(500).json({ message: 'Error interno del servidor' })
})

// Middleware para manejar solicitudes a rutas no encontradas
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
