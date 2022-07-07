const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const guardiasSchemas = new Schema({
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
        trim: true,
      },
    etapa: {
        type: String,
        required: true,
        trim: true,
      },
},{
    versionKey: false,
    timestamps: true
});

guardiasSchemas.plugin(mongoosePaginate);

module.exports = mongoose.model('Guardias', guardiasSchemas);