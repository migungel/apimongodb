const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    id_ciudadela: String,
    code: String,
    viviendas: [{
        type: Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model('Database', dataSchema);