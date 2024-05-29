// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:1234/api';
const SOAP_ENDPOINT = 'http://localhost:1234/VehicleWebServiceImpl?wsdl'; // endpoint SOAP 

export interface VehicleData {
  rut: string;
  name: string;
  patent: string;
  brand: string;
  model: string;
  price: number;
}

// Función para obtener vehículos utilizando REST API

export const getVehicles = async (): Promise<VehicleData[]> => {
  const response = await axios.get<VehicleData[]>(`${API_URL}/vehicles`);
  return response.data;
};
// Función para agregar vehículos utilizando REST API
export const addVehicle = async (vehicleData: VehicleData): Promise<VehicleData> => {
  const response = await axios.post<VehicleData>(`${API_URL}/vehicles`, vehicleData);
  return response.data;
}
// Función para eliminar vehículo utilizando REST API

export const deleteVehicle = async ({id}: {id: string}) =>{
  
  const result = await axios.delete(`${API_URL}/vehicles/${id}`)
  return result

}

// Función para realizar una solicitud SOAP
export const performSoapRequest = async () => {
  const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                xmlns:web="http://www.webserviceX.NET/">
                 <soapenv:Header/>
                 <soapenv:Body>
                   <web:ConversionRate>
                     <web:FromCurrency>INR</web:FromCurrency>
                     <web:ToCurrency>USD</web:ToCurrency>
                   </web:ConversionRate>
                 </soapenv:Body>
               </soapenv:Envelope>`;

  try {
    const response = await axios.post(SOAP_ENDPOINT, 
      xmls, 
      {
      headers: {
        'Content-Type': 'text/xml',
          SOAPAction: ''
      },
    })
    return response;
  } catch (error) {
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error making SOAP request:', error.message);
    }
    throw error;
  }
};
