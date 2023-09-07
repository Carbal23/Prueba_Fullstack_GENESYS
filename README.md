# Prueba Fullstack CMPC-Dogs - Documentación
Este repositorio contiene el código fuente de la prueba Full Stack desarrollado con NestJS, React y TypeScript. El proyecto incluye una aplicación backend y una aplicación frontend que se comunican entre sí para proporcionar una experiencia de usuario completa.

La tienda CMPC-Dogs busca modernizar sus procesos de inventario para un mejor control de las mascotas disponibles. Para abordar este desafío, se necesita una aplicación web que permita listar y filtrar las mascotas por raza y subraza.

## Requerimientos de Negocio
* Registro y Eliminación de Mascotas: La aplicación debe permitir el registro y eliminación de mascotas.

* Diseño Atractivo: La interfaz de la aplicación debe ser visualmente atractiva para una experiencia de usuario excepcional.

* Filtrado por Raza: La aplicación debe ofrecer la posibilidad de filtrar las mascotas por raza.

* Filtros Múltiples: Debe ser posible aplicar múltiples filtros de forma simultánea para refinar los resultados.

* Gestión de Filtros: Los filtros activos deben ser visibles y se debe proporcionar la opción para eliminarlos.

* Diseño Responsivo: La aplicación debe ser totalmente responsiva para adaptarse a diferentes dispositivos y tamaños de pantalla.

## Backend
El backend del proyecto está desarrollado utilizando nestJS y typescript, junto con el ORM sequelize. Utiliza una base de datos PostgreSQL para almacenar información de usuarios. A continuación, se muestran las dependencias principales utilizadas en el backend:

* El backend de la aplicación se desarrolla utilizando NestJS, un framework de Node.js para construir aplicaciones escalables y eficientes.

* TypeScript: TypeScript se utiliza para escribir el código del backend, lo que proporciona un sistema de tipos estático que mejora la seguridad y la robustez del código.

* Sequelize: Se emplea Sequelize como ORM (Object-Relational Mapping) para interactuar con la base de datos. Facilita la manipulación de datos en la base de datos PostgreSQL.

## Levantar el Backend
Para ejecutar el backend, sigue estos pasos:

1. Asegúrate de tener una base de datos PostgreSQL y colocar las credenciales para acceder a ella en un archivo .env del backend.

2. Abre una terminal en la carpeta backend.

3. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

4. Luego, ejecuta el siguiente comando para iniciar el servidor:

```bash
npm start:prod
```
El backend estará disponible en http://localhost:4000.

## Frontend
El frontend del proyecto está desarrollado utilizando React.js con TypeScript. Utiliza diversas librerías y dependencias para el manejo de la interfaz de usuario y la comunicación con el backend. A continuación, se muestran las dependencias principales utilizadas en el frontend:

* React: El frontend de la aplicación está desarrollado con React, una popular biblioteca JavaScript para la creación de interfaces de usuario.

* TypeScript: TypeScript se utiliza para escribir el código del frontend, lo que proporciona una tipificación estática y ayuda a prevenir errores.

* Material-UI: Material-UI es la librería de diseño elegida para la interfaz de usuario, proporcionando componentes y estilos atractivos.

* axios: Axios se utiliza para realizar solicitudes HTTP desde el frontend, lo que permite la comunicación con el backend.


## Levantar el Frontend
Para ejecutar el frontend, sigue estos pasos:

1. Abre una terminal en la carpeta frontend.
2. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

3. Luego, ejecuta el siguiente comando para iniciar la aplicacion:

```bash
npm run start
```
El frontend estará disponible en http://localhost:5173.

## Docker
El proyecto también incluye archivos Dockerfile y docker-compose.yml para facilitar el despliegue de las aplicaciones utilizando Docker. El backend se ejecutará en el puerto 4000 y el frontend en el puerto 5173.

## Levantar las Aplicaciones con Docker
Para levantar las aplicaciones utilizando Docker, sigue estos pasos:

1. Asegúrate de tener Docker instalado y configurado en tu sistema.
2. Abre una terminal en la raíz del proyecto (donde se encuentra el archivo docker-compose.yml).
3. Ejecuta el siguiente comando para iniciar los servicios:

```bash
docker-compose build
```
4. luego el siguiente comando:

```bash
docker-compose up
```

Una vez que los contenedores se hayan iniciado, el backend estará disponible en http://localhost:4000 y el frontend en http://localhost:3000.

Con esto, tendrás el proyecto Fullstack CMPC-Dogs completamente levantado y listo para ser utilizado.

¡Gracias por revisar la documentación del proyecto! Si tienes alguna pregunta o necesitas más información, no dudes en contactarme.
