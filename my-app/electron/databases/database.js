//Importar IpcMain
const { ipcMain } = require('electron');

//Importar los modelos
const controladorDiagnosticos = require('./controller/controladorDiagnostico');
const controladorPersonas = require('./controller/controladorPersona');
const controladorSesiones = require('./controller/controladorSesion');

//Importar la base de datos que se va a utilizar

function createLocalDB() {
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
        console.log(paciente, 'borrado')
        return paciente;
    });
}

module.exports = { createLocalDB };