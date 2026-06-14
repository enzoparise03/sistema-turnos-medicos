//ejecutamos la libreria dotenv para que lea el archivo .env
require('dotenv').config(); 

//importamos la libreria express
const express = require('express');

//importamos la funcion creada en db.js para conectar la bases
const conectarBaseDeDatos = require('./config/db'); 

//importamos el middleware cors
const cors = require('cors');

//Importamos cookie parser
const cookieParser = require('cookie-parser');

//Creamos la instancia de la aplicacion Express, para manejar las peticiones del servidor
const aplicacion = express();

// Importa las rutas relacionadas con turnos
const rutaDeTurnos = require('./routes/turnoRoutes');

// Importa las rutas relacionadas con usuarios
const rutasDeUsuarios = require('./routes/usuarioRoutes');

// importamos las rutas relacionadas a los usuarios
const profesionalRoutes = require('./routes/profesionalRoutes');

aplicacion.use(cors());
//middlware para convertir JSON recibido en un objeto js
aplicacion.use(express.json());

aplicacion.use(cookieParser());

//ejecutamos la funcion
conectarBaseDeDatos();

//ruta base get para verificar que el servidor responda
aplicacion.get('/api', (req, res) => {
    res.send('API de Sistema de Turnos funcionando perfectamente ');
});

//Registramos las rutas de la api antes de levantar o exportar el servidor
aplicacion.use('/api/turnos', rutaDeTurnos);
aplicacion.use('/api/usuarios', rutasDeUsuarios);
// Montamos el enrutador de profesionales bajo el prefijo solicitado
aplicacion.use('/api/professionals', profesionalRoutes);

//exportamos la aplicacion para que supertest pueda importarla en api.test.jss
module.exports = aplicacion;

//puerto en el que va a escuchar el servidorr
const PUERTO = process.env.PORT || 3000;

//solo le decimos al servidor que se ponga a escuchar si no estamos corriendo tests
if (process.env.NODE_ENV !== 'test') {
    aplicacion.listen(PUERTO, () => {
        console.log(`Servidor corriendo en el puerto ${PUERTO}`);
    });
}
