const Modelo = require('../modelos/modeloPersona');
const Helper = require('../../ayuda');

async function agregar(args) {
    if (args._id) return;
    return await Modelo.agregar(args);
}

async function borrar(id) {
    return await Modelo.borrar(id);
}

async function actualizar(args) {
    return await Modelo.actualizar(args);
}

async function encontrar(query) {
    //identificar si la variable query, es literalmente un objeto
    if ((!!query) && (query.constructor === Object)) {
        return await Modelo.encontrar(query);
    }
    return;
}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar
}