const Modelo = require('../modelos/modeloDiagnostico');

function agregar(args) {

    Modelo.agregar(args);
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