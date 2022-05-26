const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminsSchemas = new Schema({
    name: String,
    user: String,
    pass: String,
    role: String,
    cedula: String,
    celular: String,
    ciudadelasCargo: Array
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Admins', adminsSchemas);