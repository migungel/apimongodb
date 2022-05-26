const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guardiasSchemas = new Schema({
    name: String,
    cedula: String,
    celular: String,
    user: String,
    pass: String,
    role: String,
    ciudadela: String,
    etapa: String,
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Guardias', guardiasSchemas);