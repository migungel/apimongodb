const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etapasSchemas = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ciudadela: {
      type: String,
      required: true,
      trim: true,
    },
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Etapas', etapasSchemas);