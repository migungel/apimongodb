//const mongoose = require('mongoose');
const Residente = require('../models/Residentes');

//actualizar residente
const updateResi = (req, res)=>{
    let residenteid = req.params.id;
    let update = req.body;
    Residente.findByIdAndUpdate(residenteid, update, (err, resiUpdate) =>{
        if(err) err.status(500).send({message: `Error al actualizar el usuario: ${err}`});

        res.status(200).json({resiUpdate});
    });
};

//residentes
const findAllResidentes = (req, res)=>{
    Residente.find((err, resi)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(resi);
    });
};

//encontrar usuarios por ID
const findResiById = (req, res)=>{
    Residente.findById(req.params.id, (err, resi)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(resi);
    });
};

//Delete Residente
const deleteResidente = (req, res)=>{
    let id = req.params.id;
    Residente.findById(id, (err, resi)=>{
        if(err) err.status(500).send({message: `Error al borrar el usuario: ${err}`});

        resi.remove(err => {
            if (err) err.status(500).send({message: `Error al borrar el usuario: ${err}`});
            res.status(200).send({message: 'El usuario ha sido eliminado'})
        })
    });
};

//Busqueda por ci
//const findResidenteByCi = (req, res) => {
//    const ci = req.query.ci;
//    //console.log(ci);
//    var condition = ci ? { ci: { $regex: new RegExp(ci), $options: "i" } } : {};
//    Residente.find(condition, (err, resi)=>{
//        err && res.status(500).send(err.message);
//        res.status(200).json(resi);
//    });
//};

//Busqueda usuario por nombre
const findResiByName = (req, res) => {
    const name = req.query.name;
    //console.log(name);
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Residente.find(condition, (err, resi)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(resi);
    });
};

const newResidente = async (req, res) => {
    const { user, pass, role, ciudadela, villa, name, celular, cedula, etapa} = req.body;
    const resiIn = await Residente.findOne({ user });
    if(resiIn) return res.status(401).send("Residente exists");
    const newResi = new Residente({user, pass, role, ciudadela, villa, name, celular, cedula, etapa});
    await newResi.save();
    res.status(200).json({newResi});
}

module.exports = {
    updateResi,
    findAllResidentes,
    findResiById,
    deleteResidente,
    //findResidenteByCi,
    findResiByName,
    newResidente,
};