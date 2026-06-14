const Profesional = require('../models/Profesional');

const obtenerProfesionales = async (req, res) => {
    try {
        const { specialty } = req.query;
        let filtro = {};

        // Si viene el parámetro ?specialty= se aplica un filtro con expresiones regulares
        if (specialty) {
            filtro.especialidad = { $regex: new RegExp(specialty, 'i') };
        }

        const profesionales = await Profesional.find(filtro);
        res.status(200).json(profesionales);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los profesionales', error: error.message });
    }
};

const obtenerProfesionalPorId = async (req, res) => {
    try {
        const profesional = await Profesional.findById(req.params.id);
        if (!profesional) {
            return res.status(404).json({ mensaje: 'Profesional no encontrado' });
        }
        res.status(200).json(profesional);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el profesional', error: error.message });
    }
};

const crearProfesional = async (req, res) => {
    try {
        const nuevoProfesional = await Profesional.create(req.body);
        res.status(201).json({ mensaje: 'Profesional registrado con éxito', profesional: nuevoProfesional });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el profesional', error: error.message });
    }
};

const actualizarProfesional = async (req, res) => {
    try {
        const profesionalActualizado = await Profesional.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // new: true devuelve el objeto ya cambiado
        );
        if (!profesionalActualizado) {
            return res.status(404).json({ mensaje: 'Profesional no encontrado' });
        }
        res.status(200).json({ mensaje: 'Profesional actualizado con éxito', profesional: profesionalActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el profesional', error: error.message });
    }
};

const eliminarProfesional = async (req, res) => {
    try {
        const profesionalBorrado = await Profesional.findByIdAndDelete(req.params.id);
        if (!profesionalBorrado) {
            return res.status(404).json({ mensaje: 'Profesional no encontrado' });
        }
        res.status(200).json({ mensaje: 'Profesional eliminado correctamente de la base de datos' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el profesional', error: error.message });
    }
};

module.exports = {
    obtenerProfesionales,
    obtenerProfesionalPorId,
    crearProfesional,
    actualizarProfesional,
    eliminarProfesional
};