
// src/stores/vehicleStore.ts

/*

  ESTE ESTADO GLOBAL AL FINAL NO SE OCUPÓ
*/




import {create} from 'zustand';
import { VehicleData } from '../services/api';

interface VehicleStoreState {
  vehicles: VehicleData[];
  setVehicles: (vehicles: VehicleData[]) => void;
  //fetchVehicles: () => Promise<void>;
  //addVehicle: (vehicle: VehicleData) => Promise<void>;
  //deleteVehicle: (id: number) => Promise<void>;
}

export const useVehicleStore = create<VehicleStoreState>((set) => ({
  vehicles: [],
  setVehicles: (vehicles) => set({vehicles})
  /*
  fetchVehicles: async () => {
    const vehicles = await getVehicles();
    set({ vehicles });
  },
  addVehicle: async (vehicle) => {
    await addVehicle(vehicle);
    const vehicles = await getVehicles();
    set({ vehicles });
  },
  deleteVehicle: async (id) => {
    await deleteVehicle({id: id.toString()});
    const vehicles = await getVehicles();
    set({ vehicles });
  },
  */
}));
