const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitanteSchema = new Schema({
    id_residente: String,
    name: String,
    cedula: String,
    celular: String,
    placa: String,
    ingreso: Date,
    salida: Date,
    state: Boolean,
},{
    timestamps: true
});

module.exports = mongoose.model('Visitantes', visitanteSchema);