# CRUD API para Usuarios (Express.js y PostgreSQL)

Esta es una API RESTful para gestionar usuarios, construida con Express.js y PostgreSQL. La base de datos se ejecuta en un contenedor Docker, y la aplicación sigue una estructura de Model-View-Controller (MVC) simplificada.

## Estructura del Proyecto

```
curso-express-pg-cursor/
├── controllers/
│   └── user.controller.js  # Lógica de negocio para usuarios
├── models/
│   └── user.model.js       # Interacción con la base de datos para usuarios
├── routes/
│   └── user.routes.js      # Definición de rutas de la API para usuarios
├── tests/
│   └── users.test.js       # Pruebas para los endpoints de la API de usuarios
├── db.js                   # Configuración de la conexión a la base de datos PostgreSQL
├── docker-compose.yml      # Configuración de Docker para la base de datos
├── index.js                # Punto de entrada de la aplicación Express.js
├── package.json            # Metadatos del proyecto y dependencias
└── README.md               # Documentación del proyecto
```

## Requisitos Previos

Asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/) (viene con Node.js)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (para ejecutar la base de datos PostgreSQL en un contenedor)

## Configuración y Ejecución

Sigue estos pasos para levantar la aplicación y ejecutar las pruebas:

### 1. Clonar el Repositorio (si aún no lo has hecho)

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd curso-express-pg-cursor
```

### 2. Iniciar la Base de Datos PostgreSQL con Docker Compose

La configuración de la base de datos se encuentra en `docker-compose.yml`. Este archivo define un servicio de PostgreSQL llamado `northwind-db`.

Desde el directorio raíz del proyecto en tu terminal, ejecuta:

```bash
docker compose up -d
```

Esto iniciará el contenedor de la base de datos en segundo plano. Puedes verificar su estado con `docker compose ps`.

**Detalles de la Conexión a la Base de Datos:**
*   **Host:** `localhost`
*   **Puerto:** `5432`
*   **Usuario:** `northwind`
*   **Contraseña:** `northwind`
*   **Base de Datos:** `northwind`

La tabla `users` tiene la siguiente estructura (será creada por los tests si no existe):

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);
```

### 3. Instalar Dependencias del Proyecto

Desde el directorio raíz del proyecto, instala las dependencias de Node.js:

```bash
npm install
```

### 4. Ejecutar las Pruebas

Las pruebas unitarias y de integración para la API están escritas con Jest y Supertest. Estas pruebas también se encargarán de inicializar y limpiar la tabla `users` en la base de datos antes y después de cada ejecución.

Para ejecutar las pruebas, usa:

```bash
npm test
```

### 5. Iniciar la Aplicación Express.js

Para iniciar el servidor de la API:

```bash
node index.js
```

La API estará disponible en `http://localhost:3000`.

## Endpoints de la API

La API expone los siguientes endpoints para la gestión de usuarios:

*   **`GET /users`**: Obtiene todos los usuarios.
*   **`GET /users/:id`**: Obtiene un usuario por su `user_id`.
*   **`POST /users`**: Crea un nuevo usuario. Requiere `username` y `email` en el cuerpo de la solicitud.
    ```json
    {
      "username": "nuevo_usuario",
      "email": "nuevo.usuario@example.com"
    }
    ```
*   **`PUT /users/:id`**: Actualiza un usuario existente por su `user_id`. Requiere `username` y `email` en el cuerpo de la solicitud.
    ```json
    {
      "username": "usuario_actualizado",
      "email": "actualizado@example.com"
    }
    ```
*   **`DELETE /users/:id`**: Elimina un usuario por su `user_id`.

## Consideraciones

*   Asegúrate de que el contenedor de Docker `northwind-db` esté corriendo antes de iniciar la aplicación o ejecutar las pruebas.
*   Si la tabla `users` no existe en tu base de datos `northwind`, los tests la crearán automáticamente al ejecutarse.
