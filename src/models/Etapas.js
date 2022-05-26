const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etapasSchemas = new Schema({
    name: String,
    //code: String,
    ciudadela: String,
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Etapas', etapasSchemas);