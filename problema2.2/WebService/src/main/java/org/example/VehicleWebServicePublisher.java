package org.example;

import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import javax.xml.ws.Endpoint;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
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

                    // Obtener los vehículos (aquí asumimos que tu servicio puede devolver una lista de vehículos)
                    VehicleWebService vehicleService = new VehicleWebServiceImpl();
                    String vehicles = vehicleService.getVehicles();

                    // Convertir los vehículos a XML
                    String vehiclesXml = vehicles;

                    // Enviar la respuesta XML
                    exchange.getResponseHeaders().set("Content-Type", "text/xml");
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


}
