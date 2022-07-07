const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viviendaSchema = new Schema({
  //residente:String,
  manzana: {
      type: String,
      required: true,
      trim: true,
    },
  villa: {
      type: String,
      required: true,
      trim: true,
    },
  ciudadela: {
      type: String,
      required: true,
      trim: true,
    },
  descripcion: {
      type: String,
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

module.exports = mongoose.model('Viviendas', viviendaSchema);