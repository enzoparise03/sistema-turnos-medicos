const express = require('express');
const enrutador = express.Router();
const profesionalController = require('../controllers/profesionalController');

// Importamos los middlewares de seguridad que controlan el JWT de las cookies
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas para cualquier usuario autenticado (pacientes o admins)
enrutador.get('/', verificarToken, profesionalController.obtenerProfesionales);
enrutador.get('/:id', verificarToken, profesionalController.obtenerProfesionalPorId);

// Rutas privadas protegidas por la doble barrera: Token válido + Rol Admin
enrutador.post('/', verificarToken, verificarAdmin, profesionalController.crearProfesional);
enrutador.put('/:id', verificarToken, verificarAdmin, profesionalController.actualizarProfesional);
enrutador.delete('/:id', verificarToken, verificarAdmin, profesionalController.eliminarProfesional);

module.exports = enrutador;