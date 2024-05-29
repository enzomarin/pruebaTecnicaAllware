import z from 'zod'

const vehicleSchema = z.object({
  rut: z.string().min(1, 'RUT del vendedor es requerido'),
  name: z.string().min(1, 'Nombre y apellido son requeridos'),
  patent: z.string().min(1, 'Patente es requerida'),
  brand: z.string().min(1, 'Marca es requerida'),
  model: z.string().min(1, 'Modelo es requerido'),
  price: z.number().positive('El precio debe ser un número positivo')
})

export function validateVehicle (object) {
  return vehicleSchema.safeParse(object)
}

export function validatePartialVehicle (input) {
  return vehicleSchema.partial().safeParse(input)
}
