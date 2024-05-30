package org.example;

import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.ws.Endpoint;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.List;

public class VehicleWebServicePublisher {

    public static void main(String[] args) throws IOException {
        // Crear un servidor HTTP
        HttpServer server = HttpServer.create(new InetSocketAddress(1234), 0);
        // Publicar el punto final SOAP
        Endpoint.publish("http://localhost:1234/VehicleWebServiceImpl", new VehicleWebServiceImpl());

        // Configurar manejador HTTP para la ruta CORS
        HttpContext context = server.createContext("/VehicleWebServiceImpl");
        context.setHandler(new HttpHandler() {
            @Override
            public void handle(com.sun.net.httpserver.HttpExchange exchange) throws IOException {
                // Registrar la solicitud entrante
                System.out.println("Solicitud recibida en la ruta: " + exchange.getRequestURI().getPath());

                // Configurar encabezados CORS
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization, SOAPAction");

                // Responder a la solicitud OPTIONS
                if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                    exchange.sendResponseHeaders(200, -1);
                    return;
                }

                // Manejar otras solicitudes
                // Aquí debes procesar las solicitudes SOAP como lo hacías antes
                // Manejar solicitudes POST (SOAP)
                if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                    // Leer el cuerpo de la solicitud
                    InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), "utf-8");
                    BufferedReader br = new BufferedReader(isr);
                    StringBuilder soapRequest = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        soapRequest.append(line).append("\n");
                    }

                    // Procesar la solicitud SOAP (puedes omitir esta parte si no la necesitas)
                    System.out.println("Solicitud SOAP recibida:");
                    System.out.println(soapRequest.toString());


                    // Convertir los vehículos a XML
                    VehicleWebService vehicleService = new VehicleWebServiceImpl();
                    VehicleList vehicles = vehicleService.getVehicles();

                    String vehiclesXml = convertToXml(vehicles);

                    // Enviar la respuesta XML
                    exchange.getResponseHeaders().set("Content-Type", "text/xml");
                    assert vehiclesXml != null;
                    exchange.sendResponseHeaders(200, vehiclesXml.getBytes().length);
                    OutputStream os = exchange.getResponseBody();
                    os.write(vehiclesXml.getBytes());
                    os.close();


                }
            }
        });



        // Iniciar el servidor HTTP
        server.start();
        System.out.println("Vehicle Service is published at http://localhost:1234/VehicleWebServiceImpl");
    }

    private static String convertToXml(VehicleList vehicles) {
        try {
            JAXBContext context = JAXBContext.newInstance(VehicleList.class);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            marshaller.marshal(vehicles, baos);
            return baos.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
