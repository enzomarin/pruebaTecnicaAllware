# RentaCar App - README
Este proyecto es una aplicación web desarrollada en React y nodeJs que permite el registro y la visualización de vehículos para una empresa de Renta Car.

# Configuración del Proyecto (problema 2.1)
 Requisitos Previos
 Asegúrate de tener instalados los siguientes programas antes de comenzar:

> Node.js y npm (se recomienda la última versión estable)

Clona este repositorio en tu máquina local utilizando Git:
```
git clone git@github.com:enzomarin/pruebaTecnicaAllware.git
```


## Base de datos

  este proyecto fue desarrollado con una base de datos Mysql local, por lo que para testear la aplicacion deben configurar una base de datos local.
  
  Para esta prueba tecnica se utilizo [DBngin](https://dbngin.com/) para la creación de base de datos y [MySQLWorkbench](https://www.mysql.com/products/workbench/) para la gestión

  codigo sql utilizado para la creación de la base de dato y tabla "vehicles"
  ```
    DROP DATABASE IF EXISTS rentacardb;

    -- creacion de DB
    CREATE DATABASE rentacardb;

    -- usar la DB
    USE rentacarDb;

    CREATE TABLE vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rut VARCHAR(50) NOT NULL,
        name VARCHAR(200) NOT NULL,
        patent VARCHAR(7) NOT NULL,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        price INT NOT NULL DEFAULT(0)
    );
  ```

## Configuración del Servidor de Desarrollo

Una vez clonado el proyecto dirigete al directorio del proyecto de backend
```
cd pruebaTecnicaAllware/problema2.1/backend/
```
Una vez en el directorio del proyecto backend instala las dependencias ejecutando:
```
  npm install
```
### Ejecutar el servidor:

En el mismo directorio ejecuta:
```
  npm run dev
```
> El servidor  estará disponible en http://localhost:1234. 

NOTA: Es importante que la configuracion de la base de datos creada y la definida para el proyecto sean las mismas para que el servidor se pueda conectar sin problemas. Dicha configuración se encuentra en ```/backend/config/db.js```
        
la configuración por defecto es:
```
    const DATABASE_CONFIG = {

          host: 'localhost',
          port: 3306, // Puerto definido al crear la base de datos, por defect 3306
          user: 'root', // usuario al crear la base de datos
          password: '',
          database: 'rentacarDb' // nombre de la base de datos creada

    }
```

### Endpoints disponibles
```
    POST
    http://localhost:1234/api/vehicles // agregar un nuevo vehiculo
    
    GET
    http://localhost:1234/api/vehicles // obtener los ultimos 10 vehículos registrados
    
    DELETE
    http://localhost:1234/api/vehicles/:id // Eliminar un vehículo por id

```

## Ejecutar la Aplicación Frontend
dirigirse al proyecto frontend: 
```
  cd pruebaTecnicaAllware/problema2.1/frontend/rentacarFront/
```

instalar dependencias: 
```
 npm install
```

Levantar aplicacion cliente: 
```
  npm run dev
```
esto levantara la aplicacion frontend en "http://localhost:PORT/"
## Uso de la Aplicación
En la página principal, encontrarás un nabvar que contendra el link para redirigir al formulario (inicio "http://localhost:PORT/") y a la lista de vehiculo (http://localhost:PORT/vehicles), la cual tendrá una tabla que muestra los últimos 10 vehículos registrados.


***

***


# Configuración del Proyecto (Problema 2.2)

Este proyecto utiliza Java 1.8, Maven como gestor de dependencias y IntelliJ como entorno de desarrollo integrado.

### Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

Java Development Kit (JDK) 1.8: Necesario para compilar y ejecutar el código Java.
IntelliJ IDEA: Entorno de desarrollo integrado para Java.
Maven: Herramienta de gestión de proyectos y dependencias para Java.

### Configuración del Proyecto
#### Clonar el Repositorio:

````
  git clone git@github.com:enzomarin/pruebaTecnicaAllware.git

````

#### Importar el Proyecto en IntelliJ:

- Abre IntelliJ IDEA.
- Selecciona File -> Open y navega hasta el directorio del proyecto clonado (```pruebaTecnicaAllware/problema2.2/WebService ```).


### Ejecutar Servidor desde IntelliJ:

Abre la clase "VehicleWebServicePublisher.java" del servidor.
Haz clic derecho en la clase y selecciona Run 'VehicleWebServicePublisher.main()'.


## Ejecutar la Aplicación Frontend
Para ejecutar la aplicación frontend que interactúa con el webSerivce SOAP:

#### Dirigirse al proyecto del cliente
```
 cd pruebaTecnicaAllware/problema2.2/rentacarFront/
```

#### Instalar Dependencias:

Una vez en la carpeta del proyecto rentacarFront Ejecuta:
```
  npm install
```
#### Iniciar la Aplicación:

Una vez instaladas las dependencias, ejecuta:
```
  npm run dev

```
Esto iniciará la aplicación frontend en http://localhost:PORT.

## Uso y Pruebas
Accede a http://localhost:PORT/vehicles en tu navegador para usar la aplicación frontend.

NOTA : Esta aplicacion frontend se reutilizo del problema 1 para conectar el cliente (reeact) con el webService SOAP y consumir el servicio. Por lo que las funciones de agregar y eliminar no funcionan, solo es posible la visualizacion de los datos proporcionados por el servicio

NOTA2 : el servicio envia datos de pruebas ya que no alcance a conectar con la base de datos.