package org.example;
import javax.jws.WebMethod;
import javax.jws.WebResult;
import javax.jws.WebService;

import java.util.ArrayList;
import java.util.List;

@WebService
public class VehicleWebServiceImpl implements VehicleWebService{

    @Override
    @WebMethod
    @WebResult(name = "vehicles") // Nombre del elemento contenedor en el XML
    public VehicleList getVehicles() {
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

        Vehicle vehicle3 = new Vehicle();
        vehicle3.setRut("567890123");
        vehicle3.setName("Michael Johnson");
        vehicle3.setPatent("XY789ZA");
        vehicle3.setBrand("Honda");
        vehicle3.setModel("Civic");
        vehicle3.setPrice(1200000);

        Vehicle vehicle4 = new Vehicle();
        vehicle4.setRut("345678901");
        vehicle4.setName("Emily Davis");
        vehicle4.setPatent("GH456JK");
        vehicle4.setBrand("Chevrolet");
        vehicle4.setModel("Camaro");
        vehicle4.setPrice(1800000);

        Vehicle vehicle5 = new Vehicle();
        vehicle5.setRut("901234567");
        vehicle5.setName("David Wilson");
        vehicle5.setPatent("LM789OP");
        vehicle5.setBrand("BMW");
        vehicle5.setModel("X5");
        vehicle5.setPrice(2500000);

        Vehicle vehicle6 = new Vehicle();
        vehicle6.setRut("654321098");
        vehicle6.setName("Sophia Garcia");
        vehicle6.setPatent("QR123ST");
        vehicle6.setBrand("Mercedes-Benz");
        vehicle6.setModel("C-Class");
        vehicle6.setPrice(1500000);

        Vehicle vehicle7 = new Vehicle();
        vehicle7.setRut("234567890");
        vehicle7.setName("Daniel Brown");
        vehicle7.setPatent("UV456WX");
        vehicle7.setBrand("Audi");
        vehicle7.setModel("A4");
        vehicle7.setPrice(2200000);

        Vehicle vehicle8 = new Vehicle();
        vehicle8.setRut("789012345");
        vehicle8.setName("Olivia Martinez");
        vehicle8.setPatent("NO789RS");
        vehicle8.setBrand("Hyundai");
        vehicle8.setModel("Tucson");
        vehicle8.setPrice(1300000);

        Vehicle vehicle9 = new Vehicle();
        vehicle9.setRut("456789012");
        vehicle9.setName("Emma Taylor");
        vehicle9.setPatent("CD456EF");
        vehicle9.setBrand("Kia");
        vehicle9.setModel("Sportage");
        vehicle9.setPrice(1400000);

        Vehicle vehicle10 = new Vehicle();
        vehicle10.setRut("012345678");
        vehicle10.setName("Noah Moore");
        vehicle10.setPatent("PQ123RS");
        vehicle10.setBrand("Volvo");
        vehicle10.setModel("XC90");
        vehicle10.setPrice(2800000);



        vehicles.add(vehicle1);
        vehicles.add(vehicle2);
        vehicles.add(vehicle3);
        vehicles.add(vehicle4);
        vehicles.add(vehicle5);
        vehicles.add(vehicle6);
        vehicles.add(vehicle7);
        vehicles.add(vehicle8);
        vehicles.add(vehicle9);
        vehicles.add(vehicle10);

        VehicleList vehicleList = new VehicleList();
        vehicleList.setVehicles(vehicles);

        return vehicleList;
    }

}
