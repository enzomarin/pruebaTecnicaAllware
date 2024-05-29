// src/components/VehicleList.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getVehicles, deleteVehicle } from '../services/api';
import DeleteIcon from '../../public/icons/deleteIcon'


// Definiciónd de estilos
const Table = styled.table`
  width: 100%;

  th, td{
    padding: 10px;
    text-align: center;
  }
  th {
    background-color: #f4f4f4;

  }
`

const Button = styled.button`
  width: 32px;
  height: 24px;
  background-color: #037bff;
  border: 1px solid #037bff;
  border-radius: 5px;
  cursor: pointer;
  align-content: center;
  justify-content: center;
  &:hover {
    background-color: #0056b3;
  }
`

const DeletIcon = styled(DeleteIcon)`
  width: 20px;
  height: 20px;
  stroke: white;  /* Cambia el color del icono a blanco */

`
/*
  Definición de la interfaz para un vehículo 
  ( ESta interface seberia estar en un archivo 
  type.d.ts para reutilizarla en todos los componentes que se utiliza y no generar posibles errores)
*/
interface Vehicle {
  id?: number;
  rut: string;
  name: string;
  patent: string;
  brand: string;
  model: string;
  price: number;
}

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Hook useEffect para obtener los vehículos al montar el componente
  useEffect(() => {
    fetchVehicles();
  }, [vehicles]); // Al cambiar el estado se vuelve a ejecutar el useEffect realizando el fetch nuevamente
  // esto Se podría mejorar con un contexto o un estado global para evitar hacer un fetch cada vez que 
  // cambia el estado que contiene los vehículos

  // Función que realiza el fetching de datos
  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  // Manejar el clic en el botón de eliminar
  const handleDeletClick = async (id : number | undefined) =>{
    const stringId = id?.toString() || ""
    try {
      const result = await deleteVehicle({id : stringId}); // Realizamos el delete 
      if (result.status === 204){ // si entrega status 204 se eliminó correctamente
        alert("Vehiculo eliminado correctamente")

      }

    } catch (error) {
      console.error('error deleting a vehicle:', error);
    }
  }

  // Renderizado de la tabla con sus datos
  return (
    <Table>
      <thead>
        <tr>
          <th>Nombre y apellido</th>
          <th>Rut vendedor</th>
          <th>Patente vehiculo</th>
          <th>Marca vehiculo</th>
          <th>Modelo vehiculo</th>
          <th>Precio</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => ( // Recorremos el arreglo de vehículos con map
          <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.rut}</td>
              <td>{vehicle.patent}</td>
              <td>{vehicle.brand}</td>
              <td>{vehicle.model}</td>
              <td>${vehicle.price}</td>
              <td> 
                <Button onClick={() => handleDeletClick(vehicle.id)}> {/* A cada fila (vehículo) le agregamos un botno para eliminarlo*/}
                  <DeletIcon ></DeletIcon>
                </Button>
              </td>
          
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VehicleList;
