const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciudadelasSchemas = new Schema({
    name: String,
    code: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Ciudadelas', ciudadelasSchemas);