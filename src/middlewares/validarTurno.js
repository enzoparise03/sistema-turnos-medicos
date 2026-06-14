// Importamos las funciones de la librería express-validator
const {check, validationResult } = require('express-validator');

//deinimos las reglas de validacion en este array:
const reglasValidacionTurno = [
    // Revisamos que el campo "paciente" exista y no esté vacío
    check('paciente')
    .notEmpty().withMessage('Debes ingresar el nombre del paciente'),

    // Revisamos que el campo "profesional" exista y no esté vacío
    check('profesional')
    .notEmpty().withMessage('Debes ingresar el nombre del profesional'),

    // Revisamos que el campo "fecha" exista y no esté vacío
    check('fecha')
    .isDate().withMessage('La fecha debe tener un formato valido')
];

//creamos un middleware para revisar errores
const revisarErrores = (req, res, next) =>{
    //si hubo error anteriormente se "escanea" aca
    const errores = validationResult(req);

    //si hay errores habra status 400 con el mensaje:
    if(!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: 'Error en los datos ingresados',
            errores: errores.array() //lista de que fallo
        });
    }

    //si no hay errores se sigue
    next();
}

//exportamos ambas cosas
module.exports = {
    reglasValidacionTurno,
    revisarErrores
};