const Modelo = require('../modelos/modeloDescripcion');

async function agregar(args) {

    return await Modelo.agregar(args);

}

async function borrar(id) {

    return await Modelo.borrar(id);

}

async function actualizar(id, args) {

    return await Modelo.actualizar(id, args);
}

async function encontrar(id) {
    
    return await Modelo.encontrar(id);

}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar
}