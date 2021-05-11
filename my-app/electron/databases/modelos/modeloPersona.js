const Datastore = require('nedb');
const collection = new Datastore({ filename: './personas.l7' });

collection.loadDatabase(err => { if (err) console.log(err) });


function agregar(arg) {

    var persona = {
        nombre: arg.nombre,
        tipo_documento: arg.tipo_documento,
        numero_documento: arg.numero_documento,
        fecha_nacimiento: arg.fecha_nacimiento,
        sesiones: arg.sesiones,
        diagnosticos: arg.diagnosticos
    }

    return new Promise((resolve, reject) => {
        collection.insert(persona, (err, newDoc) => {
            if (!err)
                resolve(newDoc);
            reject(0);
        });
    })
}

function borrar(id) {
    return new Promise((resolve, reject) => {
        collection.remove(id, (err, obj) => {
            if (!err) {
                console.log('borradi', obj);
                resolve(obj);
            }
            reject(err);
        })
    })
}

function actualizar(arg) {
    var persona = {
        nombre: arg.nombre,
        tipo_documento: arg.tipo_documento,
        numero_documento: arg.numero_documento,
        fecha_nacimiento: arg.fecha_nacimiento,
        sesiones: arg.sesiones,
        diagnosticos: arg.diagnosticos
    }

    return new Promise((resolve, reject) => {
        collection.update({ _id: arg._id }, persona, { returnUpdatedDocs: true }, (err, updatedPerson) => {
            if (err) {
                reject(err);
            }
            resolve(updatedPerson);
        });
    });
}

function encontrar(query) {
    return new Promise((resolve, reject) => {
        collection.find(query, (err, paciente) => {
            if (err) reject(err);
            resolve(paciente);
        });
    })
}

module.exports = {
    actualizar,
    encontrar,
    agregar,
    borrar,
}