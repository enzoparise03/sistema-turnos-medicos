const express = require('express');
// router para las rutas de usuarios
const enrutador = express.Router();
// Importamos el controlador de usuarios
const controladorUsuarios = require('../controllers/usuarioController');
// Ruta para registrar un usuario
const { verificarToken } = require('../middlewares/authMiddleware');
enrutador.post('/registro', controladorUsuarios.registrarUsuario);
// Ruta para iniciar sesión
enrutador.post('/login', controladorUsuarios.loginUsuario);
// Ruta para cerrar sesion
enrutador.post('/logout', verificarToken, controladorUsuarios.logoutUsuario);
// Exportamos el router para utilizarlo en app.js
module.exports = enrutador;