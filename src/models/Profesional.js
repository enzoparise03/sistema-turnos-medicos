const mongoose = require('mongoose');

// Definimos el esquema del profesional con validaciones básicas
const profesionalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    especialidad: {
        type: String,
        required: [true, 'La especialidad es obligatoria']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    telefono: {
        type: String
    }
});

module.exports = mongoose.model('Profesional', profesionalSchema);