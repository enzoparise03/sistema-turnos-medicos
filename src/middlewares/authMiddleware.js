//importamos la libreria JWT para veriicar tokens
const jwt = require('jsonwebtoken');

//se verifica al usuario con su token
const verificarToken = (req, res, next) => {
    console.log("Cookies:", req.cookies);
    console.log("Header Cookie:", req.headers.cookie);

    const tokenEnviado = req.cookies.token;

    console.log("Token:", tokenEnviado);


    if (!tokenEnviado){
        return res.status(403).json({ 
        mensaje: 'Acceso denegado: No se envio un token'});
    }
    try {
        //verificamos que el token sea valido
        const tokenVerificado = jwt.verify(tokenEnviado, process.env.JWT_SECRET);

        req.usuario = tokenVerificado;

        next();
        //si el token es invalido o expirado:
    } catch (error) {
        res.status(401).json({ mensaje: 'Token invaido o expirado '});
    }
};

// Middleware para verificar si el usuario es administrador para put y delet
const verificarAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin'){
        return res.status(403).json({ mensaje: 'Acceso denegado: Se requieren permisos de administrador'});
    }
    next();
};


module.exports = { verificarToken, verificarAdmin};