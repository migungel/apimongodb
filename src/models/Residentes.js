const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const residenteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    cedula: {
        type: String,
        required: true,
        trim: true,
    },
    celular: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: String,
        required: true,
        trim: true,
    },
    pass: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    ciudadela: {
        type: String,
        required: true,
    },
    etapa: {
        type: String,
        required: true,
    },
    villa: {
        type: String,
        required: true,
    },
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Residente', residenteSchema);