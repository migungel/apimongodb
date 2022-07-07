const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciudadelasSchemas = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Ciudadelas', ciudadelasSchemas);