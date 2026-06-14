// importamos el modelo usuario para trabajar con MongoDB
const Usuario = require('../models/Usuario');
// Importamos jsonwebtoken para generar rokens JWT
const jwt = require('jsonwebtoken');
//Importamos crypto para generar hashes y salts
const crypto = require('crypto');

//Funcion que genera el hash de una contraseña
function hashPassword(password, salt){
    const hash = crypto.createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    return hash;
}


//
const registrarUsuario = async (req, res) => {
    try {
        //extraemos lo que nos manda el usuario
        const { nombre, email, contrasena, rol} = req.body;
        //verificamos si el mail existe en la bd
        const usuarioExistente = await Usuario.findOne({ email: email});
        if (usuarioExistente){
            return res.status(400).json({ mensaje: 'Esta email ya esta registrado'});
        }

        // Generamos un salt aleatorio
        const salt = crypto.randomBytes(16).toString('hex');

        // Hasheamos la contraseña
        const contrasenaHasheada = hashPassword(contrasena, salt);

        //Creamos el usuario en la base de datos reemplazando la clave original por la hasheada
        const nuevoUsuario = await Usuario.create({
            nombre: nombre,
            email: email,
            contrasena: contrasenaHasheada, 
            salt: salt,                     
            rol: rol || 'cliente' // Si no manda rol, por defecto es cliente

        });

        //respondemos con exito
        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        });
        //si hay error: 
    } catch (error) {
        res.status(500).json({mensaje: 'Error al registrar al usuario', error: error.message});
    }
};


//Funcion para loguear al usuario
const loginUsuario = async (req, res) => {
    try {
        //extraemos el email y la contraseña plana que manda el usuario
        const { email, contrasena } = req.body;
        //buscamos al usuario en la bd
        const usuario = await Usuario.findOne({ email: email});
        //si el usuario no existe:
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado'});
        }
        
        //verificamos la contraseña y la mezclamos con el "salt" que guardamos previamente en mongo
        const hashIngresado = hashPassword(contrasena, usuario.salt);

        //si el hash que se genero no es el mismo al de la bd: 
        if (hashIngresado !== usuario.contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        //si todo esta correco se crea el JWT
        const datosDelToken = {
            id: usuario._id,
            rol: usuario.rol
        };

        //generamos el jwt y le damos una durabilidad de sesion de 1h
        const token = jwt.sign(datosDelToken, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.cookie('token', token,{
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });

        // Devolvemos el token al cliente
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token: token
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al inciar sesion', error: error.message});
    }
};

const logoutUsuario = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false
    });

    res.status(200).json({ mensaje: 'Sesion cerrada correctamente.'});
};
//exportamos la funciones
module.exports = {
    registrarUsuario,
    loginUsuario,
    logoutUsuario
};