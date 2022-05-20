const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const residenteSchema = new Schema({
    user: String,
    pass: String,
    role: String,
    ciudadela: String,
    code_villa: String,
    name: String,
    celular: String,
    ci: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Residente', residenteSchema);