const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viviendaSchema = new Schema({
    id_residente: String,
    name: String,
    cedula: String,
    celular: String,
    placa: String,
    ingreso: Date,
    salida: Date,
},{
    timestamps: true
});

module.exports = mongoose.model('Viviendas', viviendaSchema);