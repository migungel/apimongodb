const Etapas = require('../models/Etapas');

//Etapas
const findAllEtapas = (req, res)=>{
    Etapas.find((err, etapas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(etapas);
    });
};

//etapas por id
const findEtapasById = (req, res)=>{
    Etapas.findById(req.params.id, (err, etapa)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(etapa);
    });
};

//Etapas por ciudadela
const findEtapasByCiudadela = (req, res) => {
    const ciudadela = req.query.ciudadela;
    var condition = ciudadela ? { ciudadela: { $regex: new RegExp(ciudadela), $options: "i" } } : {};
    Etapas.find(condition, (err, et)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(et);
    });
};

//registrar etapas
const newEtapa = async (req, res) =>{
    const { name, ciudadela } = req.body;
    const etapaIn = await Etapas.findOne({ name });
    if(etapaIn) return res.status(401).send("Exists");
    const newEtapa = new Etapas({ name, ciudadela});
    await newEtapa.save();
    res.status(200).json({newEtapa});
};

//buscar etapas por nombre
const findEtapasByName = (req, res) => {
    const name = req.query.name;
    console.log(name);
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Etapas.find(condition, (err, eta)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(eta);
    });
}

module.exports = { findAllEtapas, findEtapasByCiudadela, newEtapa, findEtapasById, findEtapasByName };