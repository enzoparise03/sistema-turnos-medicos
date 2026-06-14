const mongoose = require('mongoose');

//funcion para conectar la base de datos
const conectarBaseDeDatos = async () => {
    try {
        //se obliga al programa a experar a que se complete la conexion al URL de la variable de entorno
        await mongoose.connect(process.env.MONGODB_URI);

       //se muetra en la conola si fue exitosa la conexion
        console.log('Conexión exitosa a la base de datos de MongoDB');
        
        //catch por si falla
    } catch (error) {
       //se muetra en la conola si no fue exitosa la conexion
        console.error('Hubo un error al intentar conectar la base de datos:', error.message);
    }
};


//se exporto la funcion para utilizarla en otros archivos
module.exports = conectarBaseDeDatos;