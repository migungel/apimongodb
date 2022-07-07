const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

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
    telefono: {
        type: String,
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
    email: {
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
    dvnet: {
        type: Boolean,
        required: true,
    },
},{
    versionKey: false,
    timestamps: true
});

residenteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Residentes', residenteSchema);
