package org.example;

import javax.jws.WebMethod;
import javax.jws.WebResult;
import javax.jws.WebService;
import java.util.List;

@WebService
public interface VehicleWebService {
    @WebMethod
    @WebResult(name = "vehicles")
    VehicleList getVehicles();
}


