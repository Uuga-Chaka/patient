const { ipcMain } = require('electron');

//Inicialización de la base de datos
const Datastore = require('nedb');
let db = {}

//conectar los archivos
const diagnosticos = new Datastore({ filename: './collections/diagnosticos.l7' });
const sesiones = new Datastore({ filename: './collections/sesiones.l7' });

//cargar las colecciones 
diagnosticos.loadDatabase(err => { if (err) console.log(err) });
sesiones.loadDatabase(err => { if (err) console.log(err) });

//Insertar personas

const personas = {};
const sesiones = {}
const diagnosticos = {};

personas.add = (args) => {

   
}

personas.update = (id, args) => {
 
}

personas.get = (id, args) => {
    //Search for one or many
}

personas.delete = (id) => {
    //Delete 
}

sesiones.add = (args) => {

}

sesiones.update = (id, args) => {

}

diagnosticos.add = (args) => {

}

diagnosticos.update = (id, args) => {

}

module.exports = { personas, diagnosticos, sesiones }