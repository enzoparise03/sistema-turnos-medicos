require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');

// Importación de la aplicación (se conectará a la base principal definida en el .env)
const app = require('../app'); 
const Usuario = require('../models/Usuario');

describe('Suite de Testing de Integración - API REST', () => {

    beforeEach(async () => { 
        await Usuario.deleteMany({});
    });

    // Hook Teardown Global: Ejecutado al finalizar las pruebas.
    afterAll(async () => {
        // Verificamos el estado de la conexión antes de cerrar
        if (mongoose.connection.readyState !== 0) {
            // Solo cerramos la conexión, NO destruimos la base de datos
            await mongoose.connection.close(); 
        }
    });


    test('POST /api/usuarios/registro - Debe persistir el documento y retornar Status 201', async () => {
        const res = await request(app)
            .post('/api/usuarios/registro')
            .send({ nombre: 'Enzo Parise', email: 'Enzo@turno.com', contrasena: 'clave123' });
        
        expect(res.statusCode).toBe(201);

        const usuarioGuardado = await Usuario.findOne({ email: 'Enzo@turno.com' });
        expect(usuarioGuardado).not.toBeNull();
        expect(usuarioGuardado.nombre).toBe('Enzo Parise');
    });

    test('POST /api/usuarios/registro - Debe rechazar registros duplicados y retornar 400', async () => {
        await Usuario.create({ 
            nombre: 'Enzo Parise', 
            email: 'Enzo@turno.com', 
            contrasena: 'clave123',
            hash: 'hashFalso', 
            salt: 'saltFalso' 
        });

        const res = await request(app)
            .post('/api/usuarios/registro')
            .send({ nombre: 'Enzo Fernandez', email: 'Enzo@turno.com', contrasena: 'clave123' });

        expect(res.statusCode).toBe(400);
    });

    test('GET /api/turnos - Debe denegar el acceso a rutas protegidas sin credenciales (Status 403)', async () => {
        const res = await request(app).get('/api/turnos');
        expect(res.statusCode).toBe(403); 
    });
});