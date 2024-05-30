package org.example;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "vehicle")
public class Vehicle {
    private String rut;
    private String name;
    private String patent;
    private String brand;
    private String model;
    private int price;

    // Getters y setters

    @XmlElement
    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    @XmlElement
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlElement
    public String getPatent() {
        return patent;
    }

    public void setPatent(String patent) {
        this.patent = patent;
    }

    @XmlElement
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @XmlElement
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @XmlElement
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
