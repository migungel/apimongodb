const mongoose = require('mongoose');

//const MONGODB_URI = process.env['MONGODB_URI'];
//const MONGODB_URI = 'mongodb+srv://migungel:Error_404@database.ec7g2.mongodb.net/dvnet?retryWrites=true&w=majority';
const MONGODB_URI = 'mongodb://127.0.0.1:27017/dvnet';

mongoose.connect(MONGODB_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
})
.then(db=>console.log('Database is connected'))
.catch(err=>console.log(err));
