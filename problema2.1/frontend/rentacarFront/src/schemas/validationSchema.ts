import { z } from 'zod';

export const VehicleSchema = z.object({
  rut: z.string()
    .min(1, 'El RUT es obligatorio')
    .regex(/^\d{1,9}$/, 'El RUT no debe contener puntos ni guiones y debe tener entre 1 y 9 dígitos'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  patent: z.string().min(6, 'Intesa una patente valida, EJ: ABCD82').max(6),
  brand: z.string().min(1, 'La marca es obligatoria'),
  model: z.string().min(1, 'El modelo es obligatorio'),
  price: z.number().positive('El precio debe ser mayor a cero'),
});