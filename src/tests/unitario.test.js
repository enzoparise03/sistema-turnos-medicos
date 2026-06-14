const {profesionalOcupado} = require('../controllers/validaciones');

describe('Testing Unitario - Reglas de negocio', () =>{

    test('debe dar true o sea ocupado si el profesional ya tiene turno a esa hora', () =>{

        const turnosDocHoy = ['08:00', '09:30', '10:00', '11:00'];
        const horaPaciente = '11:00';

        const resultado = profesionalOcupado(horaPaciente, turnosDocHoy);

        expect(resultado).toBe(true);
    });

    test('Debe dar false o sea libre si el profesional no tiene turnos a esa hora', () => {
    
        // El doctor tiene turnos a la mañana, pero el paciente quiere a la tarde
        const turnosDocHoy = ['08:00', '09:30', '10:00', '11:00'];
        const horaPaciente = '15:00';

        const resultado = profesionalOcupado(horaPaciente, turnosDocHoy);
        expect(resultado).toBe(false);
    });
})