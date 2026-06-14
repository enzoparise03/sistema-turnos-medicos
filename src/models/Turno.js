// Importamos Mongoose para poder crear esquemas y modelos
const mongoose = require('mongoose');

// Definimos el esquema de un turno
const EsquemaTurno = new mongoose.Schema({
    paciente: {
        type: String,
        required: [true, 'El nombre de paciente es obligatorio']
    },
    profesional:{
        type: String,
        required: [true, 'El nombre del profesonal es obligatorio']
    },
    fecha:{
        type: String,
        required: true
    },
    hora: {
        type: String,
        required:true
    },
    especialidad: {
        type: String, 
        required: true
    },
    usuarioId: {
        type: String, required: true
    },
    estado: {
        type: String,
        enum:['pendiente', 'cancelado', 'realizado'],
        // Valor por defecto al crear el turno
        default: 'pendiente'
    }
});

module.exports = mongoose.model('Turno', EsquemaTurno);