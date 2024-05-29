import { z } from 'zod';

// Esquema de validación para los datos de un vehículo

export const VehicleSchema = z.object({
  rut: z.string()
    .min(1, 'El RUT es obligatorio')
    .regex(/^\d{1,9}$/, 'El RUT no debe contener puntos ni guiones y debe tener entre 1 y 9 dígitos'), // Validamos formato del RUT (sin puntos ni guiones)
  name: z.string().min(1, 'El nombre es obligatorio'),
  patent: z.string().min(6, 'Intesa una patente valida, EJ: ABCD82').max(6), //Validamos la longitud minima y mnaxima de las patentes
  brand: z.string().min(1, 'La marca es obligatoria'),
  model: z.string().min(1, 'El modelo es obligatorio'),
  price: z.number().positive('El precio debe ser mayor a cero'), // el precio debe ser positivo > 0
});