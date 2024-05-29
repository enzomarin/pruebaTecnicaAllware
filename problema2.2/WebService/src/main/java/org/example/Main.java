package org.example;

import javax.xml.ws.Endpoint;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    /**
     * @param args
     */
    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8080/VehicleWebServiceImpl", new VehicleWebServiceImpl());
        System.out.println("Vehicle Service is published at http://localhost:1234/VehicleWebServiceImpl");
    }
}