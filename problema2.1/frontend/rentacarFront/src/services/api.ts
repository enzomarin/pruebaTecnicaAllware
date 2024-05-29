// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:1234/api';

export interface VehicleData {
  rut: string;
  name: string;
  patent: string;
  brand: string;
  model: string;
  price: number;
}

export const getVehicles = async (): Promise<VehicleData[]> => {
  const response = await axios.get<VehicleData[]>(`${API_URL}/vehicles`);
  return response.data;
};

export const addVehicle = async (vehicleData: VehicleData): Promise<VehicleData> => {
  const response = await axios.post<VehicleData>(`${API_URL}/vehicles`, vehicleData);
  return response.data;
}

export const deleteVehicle = async ({id}: {id: string}) =>{
  
  const result = await axios.delete(`${API_URL}/vehicles/${id}`)
  return result

}
