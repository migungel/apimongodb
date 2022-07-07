const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
//const upload = multer({dest:'images/'});


//settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
});

//const upload = multer({ storage: storage});
//module.exports = upload;

module.exports = multer({ storage: storage });