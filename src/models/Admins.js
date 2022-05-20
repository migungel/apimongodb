const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminsSchemas = new Schema({
    name: String,
    user: String,
    role: String,
    pass: String,
    ciudadelasCargo: Array
},{
    timestamps: true
});

module.exports = mongoose.model('Admins', adminsSchemas);