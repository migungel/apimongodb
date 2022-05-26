const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciudadelasSchemas = new Schema({
    name: String,
    code: String,
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Ciudadelas', ciudadelasSchemas);