const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const adminsSchemas = new Schema({
    name: {
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
    ciudadelasCargo: {
        type: Array,
        required: true,
    }
},{
    versionKey: false,
    timestamps: true
});

adminsSchemas.plugin(mongoosePaginate);

module.exports = mongoose.model('Admins', adminsSchemas);