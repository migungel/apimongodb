const Etapas = require('../models/Etapas');

//Etapas
const findAllEtapas = (req, res)=>{
    Etapas.find((err, etapas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(etapas);
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
const registerEtapas = async (req, res) =>{
    const { name, code } = req.body;
    const etapaIn = await Etapas.findOne({ code });
    if(etapaIn) return res.status(401).send("Exists");
    const newEtapa = new Etapa({ name, code, id_ciudadela});
    await newEtapa.save();
};

module.exports = { findAllEtapas, findEtapasByCiudadela, registerEtapas };