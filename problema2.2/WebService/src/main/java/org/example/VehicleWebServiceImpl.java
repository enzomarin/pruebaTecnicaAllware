package org.example;
import javax.jws.WebMethod;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

@WebService
public class VehicleWebServiceImpl implements VehicleWebService{

    @Override
    @WebMethod
    @WebResult(name = "vehicles") // Nombre del elemento contenedor en el XML
    public String getVehicles() {
        // Aquí se deberia implementar la lógica para obtener los vehículos de la base de datos.
        // Esto es solo un ejemplo con datos simulados.
        List<Vehicle> vehicles = new ArrayList<>();

        // Ejemplo de datos simulados
        Vehicle vehicle1 = new Vehicle();
        vehicle1.setRut("123456789");
        vehicle1.setName("John Doe");
        vehicle1.setPatent("AB123CD");
        vehicle1.setBrand("Toyota");
        vehicle1.setModel("Corolla");
        vehicle1.setPrice(1000000);

        Vehicle vehicle2 = new Vehicle();
        vehicle2.setRut("987654321");
        vehicle2.setName("Jane Smith");
        vehicle2.setPatent("EF456GH");
        vehicle2.setBrand("Ford");
        vehicle2.setModel("Mustang");
        vehicle2.setPrice(2000000);

        vehicles.add(vehicle1);
        vehicles.add(vehicle2);

        // Convertir los vehículos a XML
        String vehiclesXml = convertVehiclesToXml(vehicles);

        return vehiclesXml;
    }

    // Método para convertir los vehículos a XML
    private static String convertVehiclesToXml(List<Vehicle> vehicles) {
        try {
            // Crear un contexto JAXB para la clase Vehicle
            JAXBContext context = JAXBContext.newInstance(Vehicle.class);

            // Crear un marshaller
            Marshaller marshaller = context.createMarshaller();

            // Configurar el marshaller para formatear el XML
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

            // Crear un StringWriter para almacenar el XML serializado
            StringWriter writer = new StringWriter();

            // Iniciar la escritura del XML con un elemento raíz si es necesario
            writer.write("<vehicles>");

            // Serializar cada vehículo en la lista
            for (Vehicle vehicle : vehicles) {
                marshaller.marshal(vehicle, writer);
            }

            // Finalizar el elemento raíz si se inició antes
            writer.write("</vehicles>");

            // Obtener el XML completo como una cadena
            String vehiclesXml = writer.toString();

            // Retornar el XML generado
            return vehiclesXml;
        } catch (JAXBException e) {
            e.printStackTrace();
            // Manejar la excepción adecuadamente, por ejemplo, lanzando una excepción personalizada
            return "<error>Error al serializar los vehículos a XML</error>";
        }
    }

}
