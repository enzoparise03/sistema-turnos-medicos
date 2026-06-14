// Importamos Express
const express = require('express');
// creamos un erutador independiente
const enrutador = express.Router();
//importamos el controlador de turnos
const controladorTurnos = require('../controllers/turnoController');

//importamos las validaciones para crear turnos
const {
    reglasValidacionTurno, 
    revisarErrores } = require ('../middlewares/validarTurno');

//Importamos los middlewares de autenticacion y autorizacion  
const { 
    verificarToken, 
    verificarAdmin } = require('../middlewares/authMiddleware');

// Cuando alguien haga un POST a esta ruta, ejecutamos 'crearTurno'
enrutador.post('/',
    verificarToken, 
    reglasValidacionTurno,
    revisarErrores,
    controladorTurnos.crearTurno);

// Cuando alguien haga un GET a esta ruta, ejecutamos 'obtenerTurnos'
enrutador.get('/', verificarToken, controladorTurnos.obtenerTurnos);

//Cuando alguien haga un PUT a /api/turnos/id
enrutador.put('/:id', verificarToken, verificarAdmin, controladorTurnos.actualizarTurno);

enrutador.patch('/:id/estado', verificarToken, verificarAdmin, controladorTurnos.cambiarEstadoTurno);

// Cuando alguien haga un DELETE a /api/turnos/id
enrutador.delete('/:id', verificarToken, verificarAdmin, controladorTurnos.eliminarTurno);

// Exportamos el router
module.exports = enrutador;

