<h1 align="center">
  <p align="center">Full Stack Developer Challenge</p>
</h1>

## Indice
1. [Introduction](#introduction)
2. [Instalación](#instalación)
3. [Ejecutando las pruebas](#ejecutando-las-pruebas)

## Introduction
Este reto consistio en desarrollar una API para crear, actualizar, leer y eliminar post’s.

- **Usuarios**
> módulo para crear y consultar los usuarios registrados, dicho módulo únicamente es accesible por un administrador
- **Post.**
> módulo para crear, editar, eliminar y consultar Post


### Instalación 🔧

Paso a paso a seguir para la instalación.

1. Clonar el repositorio con `git`.
2. Acceder a la carpeta donde se haya descargado todo el código fuente del servicio.
3. Ejecutar `npm install` para instalar todas las dependencias necesarias del servicio.
4. Editar el archivo `.env` que se encuentran en la ruta `./` con los credenciales de la base de datos.
5. Crear migraciones de tablas `npx sequelize-cli db:migrate`.
6. Crear Seeder `npx sequelize-cli db:seed:all`.
7. Levantar servidor `npm run dev`.

## Ejecutando las pruebas ⚙️

`npm run test`