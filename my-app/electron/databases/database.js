//Importar IpcMain
const { ipcMain } = require('electron');

//Importar los modelos
const controladorDiagnosticos = require('./controller/controladorDiagnostico');
const controladorDescripcion = require('./controller/controladorDescripcion');
const controladorPersonas = require('./controller/controladorPersona');
const controladorSesiones = require('./controller/controladorSesion');

//Importar la base de datos que se va a utilizar

function createLocalDB() {

    /**Guarda todo el documento, sesiones, diagnosticos */
    ipcMain.handle('save-document', async (evt, args) => {

        args.sesiones = await controladorSesiones.agregar(args.sesiones);

        const personaGuardada = await controladorPersonas.actualizar(args);

        return personaGuardada;

    });

    ipcMain.handle('create-patient', async (evt, args) => {

        const pacienteCreado = await controladorPersonas.agregar(args);

        return pacienteCreado;

    });

    ipcMain.handle('find-patient', async (evt, args) => {

        const pacientes = await controladorPersonas.encontrar(args);

        return pacientes;

    })

    ipcMain.handle('findOnePatient', async (evt, args) => {

        const pacientes = await controladorPersonas.encontrar(args);

        console.log(pacientes);

    });

    ipcMain.handle('delete-patient', async (evt, args) => {

        const paciente = await controladorPersonas.borrar(args);

        return paciente;

    });


    ipcMain.handle('load-sesion', async (evt, args) => {

        const loadSesionByPatient = { patientId: args }

        const sesiones = await controladorSesiones.encontrar({});

        return sesiones;

    });

    ipcMain.handle('agregar-descripcion', async (evt, args) => {

        const description = await controladorDescripcion.agregar(args);

        return description;

    });

    /** args: nombre, descripcion del diagnostico*/
    ipcMain.handle('agregar-diagnostico', async (evt, args) => {

        const diagnostico = await controladorDiagnosticos.agregar(args);

        return diagnostico;

    });


    ipcMain.handle('load-diagnosticos', async (evt, args) => {

        const diagnostico = await controladorDiagnosticos.encontrar(args);

        return diagnostico;

    });

    ipcMain.handle('borrar-diagnostico', async (evt, args) => {
    
        const diagnostico = await controladorDiagnosticos.borrar(args);
    
        return diagnostico;
    
    });
}

module.exports = { createLocalDB };