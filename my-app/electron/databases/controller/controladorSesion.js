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

async function borrar(id) {

    return await Modelo.borrar(id);
}

function actualizar(id, args) {

    Modelo.actualizar(id, args);
}

async function encontrar(args) {

    return await Modelo.encontrar(args);

}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar
}