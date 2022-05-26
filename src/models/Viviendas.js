const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viviendaSchema = new Schema({
    manzana: String,
    villa: String,
    ciudadela: String,
    descripcion: String,
    etapa: String
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Viviendas', viviendaSchema);