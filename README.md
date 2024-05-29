# RentaCar App - README
Este proyecto es una aplicación web desarrollada en React y nodeJs que permite el registro y la visualización de vehículos para una empresa de Renta Car.

## Configuración del Proyecto (Problema 2.1)
 Requisitos Previos
 Asegúrate de tener instalados los siguientes programas antes de comenzar:

> Node.js y npm (se recomienda la última versión estable)

Clona este repositorio en tu máquina local utilizando Git:
```
git clone <URL del repositorio>
```
> Instalación de Dependencias
En la raíz del proyecto, instala las dependencias necesarias:

Configuración del Servidor de Desarrollo

problema2.1
```
cd problema2.1/backend
npm install
```

Para ejecutar el servidor :

```
npm run dev
El servidor  estará disponible en http://localhost:1234. 
```
### Base de datos

  este proyecto fue desarrollado con una base de datos Mysql local, por lo que para testear la aplicacion deben configurar una base de datos local.
  
  Para esta prueba tecnica se utilizo [DBngin](https://dbngin.com/) para la creación de base de datos y [MySQLWorkbench](https://www.mysql.com/products/workbench/) para la gestión

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
Es importante que la configuracion de la base de datos creada y la definida para el proyecto sean las mismas para que el servidor se pueda conectar sin problemas. Dicha configuración se encuentra en ```/backend/config/db.js```
        
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

> endpoints disponibles
```
    POST
    http://localhost:1234/api/vehicles // agregar un nuevo vehiculo
    
    GET
    http://localhost:1234/api/vehicles // obtener los ultimos 10 vehículos registrados
    
    DELETE
    http://localhost:1234/api/vehicles/:id // Eliminar un vehículo por id

```

NOTA: Seguir los mismos pasos para el proyecto (carpeta) de frontend (cd problema2.1/frontend/rentacarFront...)

> Uso de la Aplicación
Registro de Vehículos
Para registrar un nuevo vehículo, completa el formulario con la información requerida y haz clic en "Agregar Vehículo" para registrar el vehículo.

> Visualización de Vehículos
En la página principal, encontrarás un nabvar que contendra el link para redirigir al formulario y a la lista de vehiculos, la cual tendrá una tabla que muestra los últimos 10 vehículos registrados.


## Configuración del Proyecto (Problema 2.2)