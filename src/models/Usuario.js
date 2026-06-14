// Importamos Mongoose para trabajar con MongoDB
const mongoose = require('mongoose');

// Definimos el esquema de un usuario
const EsquemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // No puede haber dos usuarios con el mismo email
        unique: true 
    },
    contrasena: {
        type: String,
        required: true
    },
     // Salt utilizado para generar el hash de la contraseña
    salt: {
        type: String, 
        required: true
    },
    rol: {
        type: String,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    }
});

// Exportamos el modelo Usuario
module.exports = mongoose.model('Usuario', EsquemaUsuario);