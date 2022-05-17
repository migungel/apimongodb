const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    code: String,
    viviendas: [{
        type: Schema.Types.ObjectId,
        ref: 'Viviendas'
    }]
});

module.exports = mongoose.model('Database', dataSchema);