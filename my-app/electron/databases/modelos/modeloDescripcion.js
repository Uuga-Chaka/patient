const Datastore = require('nedb');
const collection = new Datastore({ filename: './descripcion.l7' });

collection.loadDatabase(err => { if (err) console.log(err) });


function agregar(args) {

    var diagnostico = {
        nombre: args.nombre,
        descripcion: args.descripcion,
        color: args.color
    }

    return new Promise((resolve, reject) => {

        collection.insert(diagnostico, (err, diagnosticoAgregado) => {

            if (!err) resolve(diagnosticoAgregado);

            reject(err)
        })
    })
}

function borrar(id) {

    return new Promise((resolve, reject) => {

        collection.remove(id, (err, response) => {

            if (!err) resolve(response);

            reject(err);

        })

    })

}

function actualizar(id, args) {

}

function encontrar(args) {

    return new Promise((resolve, reject) => {

        collection.find(args, (err, diagnostico) => {

            if (!err) resolve(diagnostico);

            reject(err);

        });

    });

}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar,
}