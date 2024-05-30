// src/services/api.ts
import axios from 'axios';

// URL base de la API (Debvería ir en un .env)
const API_URL = 'http://localhost:1234/api';

export interface VehicleData { // interface que define la estructura de los datos para los vehículos
  rut: string;
  name: string;
  patent: string;
  brand: string;
  model: string;
  price: number;
}

// Función para obtener todos los vehículos
export const getVehicles = async (): Promise<VehicleData[]> => {
  // Realizamos una solicitud GET para obtener todos los vehículos
  const response = await axios.get<VehicleData[]>(`${API_URL}/vehicles`);
  console.log(response.data)
  return response.data;
  // NOTA : El manejo de errores lo maneja el controllador
};

// Función para agregar un nuevo vehículo a través de la API
export const addVehicle = async (vehicleData: VehicleData): Promise<VehicleData> => {
  const response = await axios.post<VehicleData>(`${API_URL}/vehicles`, vehicleData);
  return response.data;
  // NOTA : El manejo de errores lo maneja el controllador
}

// Función para eliminar un vehículo específico por su ID a través de la API
export const deleteVehicle = async ({id}: {id: string}) =>{ // recibe el id del vehículo a eliminar
  
  const result = await axios.delete(`${API_URL}/vehicles/${id}`)
  return result
  // NOTA : El manejo de errores lo maneja el controllador
}
