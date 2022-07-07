const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const visitanteSchema = new Schema({
    residente: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cedula: {
      type: String,
      trim: true,
    },
    celular: {
      type: String,
      trim: true,
    },
    tipo: {
      type: String,
      required: true,
      trim: true,
    },
    placa: {
      type: String,
      trim: true,
    },
    ingreso: {
      type: Date | null,
    },
    salida: {
      type: Date | null,
    },
    state: {
      type: Boolean,
      required: true,
    },
    imagePath: {
      type: String,
    },
},{
    versionKey: false,
    timestamps: true
});

//const schema = new Schema({
//  name: String,
//  imagePath: String
//});

visitanteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Visitantes', visitanteSchema);
//module.exports = mongoose.model('Visitantes', schema);