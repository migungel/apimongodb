const Viviendas = require('../models/Viviendas');

//todas Viviendas
const findAllViviendas = async (req, res)=>{
    Viviendas.find((err, viviendas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(viviendas);
    });
};

//crear viviendas
const createViviendas = async (req, res)=>{
    const {manzana, villa, code_villa, ciudadela, descripcion, id_ciudadela, ciudadelaId} = req.body
    const ciud = await Ciudadelas.findById(ciudadelaId);
    if(code_villa) return res.status(401).send("Villa exists");
    const newVilla = new Viviendas({manzana, villa, code_villa, ciudadela, descripcion, id_ciudadela, ciudadelaId: ciud._id});
    await newVilla.save();
};

//busqueda de vivienda por ciudadela
const findViviendaByCiudadela = (req, res) => {
    const ciudadela = req.query.ciudadela;
    var condition = ciudadela ? { ciudadela: { $regex: new RegExp(ciudadela), $options: "i" } } : {};

    Viviendas.find(condition, (err, viv)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(viv);
    });
};

module.exports = {findAllViviendas, createViviendas, findViviendaByCiudadela};