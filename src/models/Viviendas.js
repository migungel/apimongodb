const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viviendaSchema = new Schema({
    manzana: String,
    villa: String,
    code_villa: String,
    ciudadela: String,
    descripcion: String,
    id_ciudadela: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Viviendas', viviendaSchema);