// Se importa el modelo de turno para interactuar con MongoDB
const Turno = require('../models/Turno');

//se importa la funcion que se creo para hacer testing unitario
const { profesionalOcupado } = require('../controllers/validaciones');

//crear turno nuevo
const crearTurno = async (req, res) => {
    try {
        // Obtenemos los datos enviados por el cliente
        const datosDelTurno = req.body;

        //verificamos si ya existe un turno con ese proesional
        const turnosExistentes = await Turno.find({
            fecha: datosDelTurno.fecha,
            profesional: datosDelTurno.profesional
        });

        const horasOcupadas = turnosExistentes.map(turno => turno.hora);

        // Si existe un turno ocupado devolvemos:
        if (profesionalOcupado(datosDelTurno.hora, horasOcupadas)) {
            return res.status(400).json({ mensaje: 'El profesional ya tiene un turno ocupado en esa fecha y horario' });
        }

        // Creamos el turno en la base de datos
        const nuevoTurno = await Turno.create({
            paciente: datosDelTurno.paciente,
            profesional: datosDelTurno.profesional,
            especialidad: datosDelTurno.especialidad,
            fecha: datosDelTurno.fecha,
            hora: datosDelTurno.hora,
        // id obtenido del usuario autenticado mediante JWT
            usuarioId: req.usuario.id 
        });

        //si todo sale bien devolvemos
        res.status(201).json({ mensaje: 'Turno creado con éxito', turno: nuevoTurno });
    } catch (error) {
        //si sale mal error interno del servidor
        res.status(500).json({ mensaje: 'Error al crear el turno', error: error.message });
    }
};

//funcion para leer los turnos
const obtenerTurnos = async (req, res) => {
    try {
        // Obtenemos filtros enviados por query 
        const filtros = req.query; 

        // Si el usuario es cliente sólo puede ver sus turnos
        if (req.usuario.rol === 'cliente') {
            filtros.usuarioId = req.usuario.id;
        }

        // Buscamos los turnos aplicando filtros
        const listaDeTurnos = await Turno.find(filtros);
        // Enviamos la lista encontrada
        res.status(200).json(listaDeTurnos);
    } catch (error) {
        //si hay error:
        res.status(500).json({ mensaje: 'Error al obtener los turnos', error: error.message });
    }
};

// Actualizar un turno
const actualizarTurno = async (req, res) => {
    try{
        // Obtenemos el ID desde la URL
        const idDelTurno = req.params.id;
        // Nuevos datos enviados por el cliente
        const datosNuevos = req.body;
        // Actualizamos el turno
        const turnoActualizado = await Turno.findByIdAndUpdate(idDelTurno, datosNuevos, {new: true});

        // Respondemos con el turno actualizado
        res.status(200).json({
            mensaje: 'turno modificado correctamente',
            turno: turnoActualizado
        });
        //si hay error:
    } catch (error) {
        res.status(400).json({mensaje: 'Error al actualiar', error:error.message});
    }
};


//Modifica unicamente el estado del turno.
const cambiarEstadoTurno = async (req, res) => {
    try {
        const idDelTurno = req.params.id;
        const { estado } = req.body; // Solo se extrae el estado del body

        // Validamos que nos envíen un estado
        if (!estado) {
            return res.status(400).json({ mensaje: 'Debe proporcionar un nuevo estado' });
        }

        // Actualizamos especificando que solo se toque el campo 'estado'
        const turnoActualizado = await Turno.findByIdAndUpdate(
            idDelTurno, 
            { estado: estado }, 
            { new: true }
        );

        if (!turnoActualizado) {
            return res.status(404).json({ mensaje: 'Turno no encontrado' });
        }

        res.status(200).json({
            mensaje: `El estado del turno ahora es: ${estado}`,
            turno: turnoActualizado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al cambiar el estado', error: error.message });
    }
};
    

// para eliminar un turno
const eliminarTurno = async (req, res) => {
    try{
    
        const idDelTurno = req.params.id;

        console.log("ID que Postman envió:", idDelTurno); 

        const turnoBorrado = await Turno.findByIdAndDelete(idDelTurno);

        if (!turnoBorrado) {
            return res.status(404).json({ mensaje: 'No se encontro ningun turno con ese ID'});
        }

        res.status(200).json({ mensaje: 'Turno eliminado de la base de datos' });

    } catch (error){
        res.status(400).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};
// Exportamos las funciones para utilizarlas en las rutas
module.exports = {
    crearTurno,
    obtenerTurnos,
    actualizarTurno,
    cambiarEstadoTurno,
    eliminarTurno
};