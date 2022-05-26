const Ciudadelas = require('../models/Ciudadelas');

//todas las Ciudadelas
const findAllCiudadelas = (req, res)=>{
    Ciudadelas.find((err, ciudadelas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(ciudadelas);
    });
};

const findCiudadelaById = (req, res) =>{
    Ciudadelas.findById(req.params.id, (err, ciudadela)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(ciudadela);
    });
};

//Ciudadelas por codigo (code)
const findCiudadelaByCode = (req, res)=>{
    const code = req.query.code;
    var condition = code ? { code: { $regex: new RegExp(code), $options: "i" } } : {};
    Ciudadelas.find(condition, (err, ciudadela)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(ciudadela);
    });
};

module.exports = {findAllCiudadelas, findCiudadelaByCode, findCiudadelaById};