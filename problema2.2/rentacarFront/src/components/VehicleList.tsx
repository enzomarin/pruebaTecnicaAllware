// src/components/VehicleList.tsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getVehicles, deleteVehicle, performSoapRequest} from '../services/api';
import DeleteIcon from '../../public/icons/deleteIcon'


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

  useEffect(() => {
    //fetchVehicles();
    fetchSoapData()
  }, [vehicles]);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchSoapData = async () => {
    try {
      const soapResponse = await performSoapRequest();
      console.log('Response from SOAP service:', soapResponse);
    } catch (error) {
      console.error('Error fetching data from SOAP service:', error);
    }
  };

  const handleDeletClick = async (id : number | undefined) =>{
    const stringId = id?.toString() || ""
    try {
      const result = await deleteVehicle({id : stringId});
      if (result.status === 204){
        alert("Vehiculo eliminado correctamente")

      }

    } catch (error) {
      console.error('error deleting a vehicle:', error);
    }
  }

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
        {vehicles.map((vehicle) => (
          <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.rut}</td>
              <td>{vehicle.patent}</td>
              <td>{vehicle.brand}</td>
              <td>{vehicle.model}</td>
              <td>${vehicle.price}</td>
              <td> 
                <Button onClick={() => handleDeletClick(vehicle.id)}>
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
