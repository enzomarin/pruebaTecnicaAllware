// src/services/api.ts
import axios from 'axios';
import XMLParser from 'react-xml-parser';



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
    // Realiza una solicitud POST SOAP al endpoint especificado
    const response = await axios.post(SOAP_ENDPOINT, xmls, {
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: '',
      },
    });

    // Parseo la respuesta XML y se obtiene los elementos de vehículo
    const xmlResponse = response.data; // obtenemos el data de la respuesta
    const parsedResponse = new XMLParser().parseFromString(xmlResponse); // parseamos a json -> retorna un arreglo de 3 niveles, por eso es necesario mapear los datos
    const vehiclesXml = parsedResponse.getElementsByTagName('Vehicle'); 

    // Mapeao de los datos XML a objetos VehicleData
    const vehicles: VehicleData[] = vehiclesXml.map((vehicleXml: any) => ({
      rut: vehicleXml.getElementsByTagName('rut')[0].value,
      name: vehicleXml.getElementsByTagName('name')[0].value,
      patent: vehicleXml.getElementsByTagName('patent')[0].value,
      brand: vehicleXml.getElementsByTagName('brand')[0].value,
      model: vehicleXml.getElementsByTagName('model')[0].value,
      price: parseFloat(vehicleXml.getElementsByTagName('price')[0].value), 
    }));

    return vehicles;

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
