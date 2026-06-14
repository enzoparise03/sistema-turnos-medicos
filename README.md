# Sistema de Turnos Médicos

**Materia:** Programación 2
**Alumno:** Enzo Nicolás Parise

API REST desarrollada para la gestión de turnos médicos. Construida sobre **Node.js**, **Express** y **MongoDB**. El sistema permite la administración completa de pacientes, profesionales de la salud y la agenda de turnos.

La aplicación implementa autenticación mediante **JSON Web Tokens (JWT)** almacenados en **Cookies HTTP-Only**, además de una lógica estricta para evitar la superposición de horarios.

---

## Características

* Registro e inicio de sesión de usuarios.
* Autenticación JWT mediante Cookies HTTP-Only.
* Gestión de profesionales.
* Gestión de turnos médicos.
* Control de acceso por roles.
* Validación de datos.
* Prevención de superposición de turnos.
* Testing automatizado.

---

## Tecnologías Utilizadas

| Tecnología          | Uso                                   |
| ------------------- | ------------------------------------- |
| Node.js & Express   | Entorno de ejecución y Framework HTTP |
| MongoDB & Mongoose  | Base de datos NoSQL y ODM             |
| JWT & Cookie-Parser | Autenticación mediante cookies        |
| Crypto              | Hashing criptográfico de contraseñas  |
| Express-Validator   | Validación y sanitización de datos    |
| Jest & Supertest    | Testing automatizado                  |

---

## Arquitectura del Proyecto

```text
src/
├── config/
│   └── db.js
├── controllers/
│   ├── profesionalController.js
│   ├── turnoController.js
│   ├── usuarioController.js
│   └── validaciones.js
├── middlewares/
│   ├── authMiddleware.js
│   └── validarTurno.js
├── models/
│   ├── Profesional.js
│   ├── Turno.js
│   └── Usuario.js
├── routes/
│   ├── profesionalRoutes.js
│   ├── turnoRoutes.js
│   └── usuarioRoutes.js
├── tests/
│   ├── api.test.js
│   └── unitario.test.js
├── app.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd proyectofinal
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/SistemaTurnos
JWT_SECRET=tu_firma_secreta
```

### 4. Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Ejecutar pruebas:

```bash
npm test
```

---

## Seguridad y Autenticación

Al realizar un `POST` a:

```http
/api/usuarios/login
```

el servidor genera una **Cookie HTTP-Only** que almacena el token JWT. Esta cookie es enviada automáticamente por el navegador en cada petición autenticada y no puede ser accedida mediante JavaScript del lado del cliente.

---

## Roles y Permisos

### Admin

* Registrar profesionales.
* Modificar profesionales.
* Eliminar profesionales.
* Reprogramar turnos.
* Cancelar turnos.
* Cambiar estados de turnos.

### Cliente

* Registrarse.
* Iniciar sesión.
* Gestionar sus propios turnos.

---

## Endpoints Principales

### Usuarios y Autenticación

| Método | Ruta                     | Acceso      | Descripción       |
| ------ | ------------------------ | ----------- | ----------------- |
| POST   | `/api/usuarios/registro` | Público     | Registrar usuario |
| POST   | `/api/usuarios/login`    | Público     | Iniciar sesión    |
| POST   | `/api/usuarios/logout`   | Autenticado | Cerrar sesión     |

### Profesionales

| Método | Ruta                     | Acceso      |
| ------ | ------------------------ | ----------- |
| GET    | `/api/professionals`     | Autenticado |
| GET    | `/api/professionals/:id` | Autenticado |
| POST   | `/api/professionals`     | Admin       |
| PUT    | `/api/professionals/:id` | Admin       |
| DELETE | `/api/professionals/:id` | Admin       |

### Turnos

| Método | Ruta                     | Acceso      |
| ------ | ------------------------ | ----------- |
| POST   | `/api/turnos`            | Autenticado |
| GET    | `/api/turnos`            | Autenticado |
| PUT    | `/api/turnos/:id`        | Admin       |
| PATCH  | `/api/turnos/:id/estado` | Admin       |
| DELETE | `/api/turnos/:id`        | Admin       |

---

## Ejemplo de Petición

### Crear un turno

```http
POST http://localhost:3000/api/turnos
```

```json
{
  "paciente": "Enzo Perez",
  "profesional": "Dra. Ana Gomez",
  "fecha": "2026-06-15",
  "hora": "14:30",
  "especialidad": "Cardiología"
}
```

---

## Formato de Respuestas

### Respuesta Exitosa

```json
{
   "paciente": "Valentina Vergara",
   "profesional": "Leonel Messi",
   "fecha": "2026-06-23",
   "hora": "16:30",
   "especialidad": "Traumatologia",
   "usuarioId": "6a2f327b91aa158102322c79",
   "estado": "pendiente",
   "_id": "6a2f36eace196154ae9a1d9f",
   "__v": 0  }
}
```

### Respuesta de Error

```json
{
  "mensaje": "El profesional ya tiene un turno ocupado en esa fecha y horario"
}
```

---

## Testing Automatizado

El proyecto utiliza **Jest** y **Supertest** para validar tanto la lógica de negocio como el funcionamiento de los endpoints.

### ¿Qué se prueba?

* Validación de reglas de negocio.
* Prevención de superposición de turnos.
* Respuestas HTTP correctas.
* Persistencia de datos en MongoDB.
* Control de acceso por roles.
* Seguridad de rutas protegidas.

### Ciclo de Vida de las Pruebas

* **beforeEach:** Limpieza de datos.
* **afterAll:** Cierre de conexiones con MongoDB.
* Ejecución sobre el mismo entorno configurado en `.env`.

---

## Autor

**Enzo Nicolás Parise**
Proyecto académico desarrollado para la materia **Programación 2**.
