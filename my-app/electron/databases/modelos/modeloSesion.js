const Datastore = require('nedb');
const collection = new Datastore({ filename: './sesiones.l7' });

collection.loadDatabase(err => { if (err) console.log(err) });

function agregar(args) {

    return new Promise((resolve, reject) => {

        collection.insert(args, (err, newDoc) => {

            if (!err) resolve(newDoc)

            reject(0);

        });

    })

}

function borrar(id) {

}

function actualizar(id, args) {

}

function encontrar(args) {

    return new Promise((resolve, reject) => {

        collection.find(args, (err, sesion) => {

            if (!err) resolve(sesion);

            reject(err);

        })

    })

}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar,
}