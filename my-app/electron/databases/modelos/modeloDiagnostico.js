const Datastore = require('nedb');
const collection = new Datastore({ filename: './diagnosticos.l7' });

collection.loadDatabase(err => { if (err) console.log(err) });


function agregar(args) {

}

function borrar(id) {

}

function actualizar(id, args) {

}

function encontrar(id) {

}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar,
}