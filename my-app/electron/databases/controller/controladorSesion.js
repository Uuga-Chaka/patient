const Modelo = require('../modelos/modeloSesion');
const Helper = require('../../ayuda');

async function agregar(args) {
    console.log('durante');
    if (Array.isArray(args)) {

        var divisorSesion = Helper.partitionArray(args, (element, i, array) => {
            return element._id !== undefined ? true : false
        });

        const prueba = await Modelo.agregar(divisorSesion[1]);
        return prueba;
    }
}

function borrar(id) {

    Modelo.borrar(id);
}

function actualizar(id, args) {

    Modelo.actualizar(id, args);
}

function encontrar(id) {


    Modelo.encontrar(id);
}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar
}