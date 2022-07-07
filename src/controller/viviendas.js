const Viviendas = require('../models/Viviendas');

//todas Viviendas
const findAllViviendas = async (req, res)=>{
    Viviendas.find((err, viviendas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(viviendas);
    });
};

//crear viviendas
const newViviendas = async (req, res)=>{
    const {manzana, villa, ciudadela, descripcion, etapa} = req.body
    const villaIn = await Viviendas.findOne({manzana, villa, etapa});
    if(villaIn) {//return res.status(401).send("Villa exists");
        return res.send("Villa exists");
    }
    const newVilla = new Viviendas({manzana, villa, ciudadela, descripcion, etapa});
    await newVilla.save();
    res.status(200).json({newVilla});
};

//busqueda de vivienda por ID
const findViviendaById = (req, res) => {
    Viviendas.findById(req.params.id, (err, vivienda)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(vivienda);
    });
};

//busqueda de vivienda por etapa
const findViviendaByEtapa = (req, res) => {
    const etapa = req.query.etapa;
    var condition = etapa ? { etapa: { $regex: new RegExp(etapa), $options: "i" } } : {};

    Viviendas.find(condition, (err, viv)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(viv);
    });
};

//busqueda de vivienda por manzana
const findViviendaByManzana = (req, res) => {
    const manzana = req.query.manzana;
    var condition = manzana ? { manzana: { $regex: new RegExp(manzana), $options: "i" } } : {};

    Viviendas.find(condition, (err, viv)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(viv);
    });
};

const updateVivienda = (req, res)=>{
    let villaid = req.params.id;
    let update = req.body;
    Viviendas.findByIdAndUpdate(villaid, update, (err, villa) =>{
        if(err) err.status(500).send({message: `Error al actualizar la vivienda: ${err}`});

        res.status(200).json({ villa });
    });
};

const deleteVivienda = (req, res) => {
    let id = req.params.id;
    Viviendas.findById(id, (err, villa)=>{
        if(err) err.status(500).send({message: `Error al borrar la vivienda: ${err}`});

        villa.remove(err => {
            if (err) err.status(500).send({message: `Error al borrar la vivienda: ${err}`});
            res.status(200).send({message: 'La vivienda ha sido eliminada'})
        })
    });
};

module.exports = {
    findAllViviendas,
    newViviendas,
    findViviendaById,
    findViviendaByEtapa,
    updateVivienda,
    deleteVivienda,
    findViviendaByManzana,
};