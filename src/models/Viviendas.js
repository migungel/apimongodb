const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viviendaSchema = new Schema({
    manzana: String,
    villa: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Viviendas', viviendaSchema);