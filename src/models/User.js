const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: String,
    pass: String
    //user: { type: String },
    //pass: { type: String }
},{
    timestamps: true
});

//module.export = model('User', userSchema);
//module.export = User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);