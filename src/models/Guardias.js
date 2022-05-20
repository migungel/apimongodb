const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guardiasSchemas = new Schema({
    name: String,
    user: String,
    ci: String,
    ciudadela: String,
    etapa: String,
    pass: String,
    role: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Guardias', guardiasSchemas);