//const mongoose = require('mongoose');
const Residente = require('../models/Residentes');

//inicar sesion
//const iniciarSesion = async (req, res)=>{
//    const {user, pass} = req.body;
//    const residenteIn = await Residente.findOne({ user });
//    if(!userIn) return res.status(401).send("User doesn't exists");
//    if(userIn.pass !== pass) return res.status(401).send("Wrong password");
//    const token = jwt.sign({ _id: userIn._id }, 'key');
//    const id = userIn._id;
//    res.status(200).json({token, id});
//};

//actualizar residente
const actualizaResi = (req, res)=>{
    let residenteid = req.params.id;
    let update = req.body;
    Residente.findByIdAndUpdate(residenteid, update, (err, resiUpdate) =>{
        if(err) err.status(500).send({message: `Error al actualizar el usuario: ${err}`});

        res.status(200).json({user: resiUpdate});
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
const findResidenteByCi = (req, res) => {
    const ci = req.query.ci;
    //console.log(ci);
    var condition = ci ? { ci: { $regex: new RegExp(ci), $options: "i" } } : {};
    Residente.find(condition, (err, resi)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(resi);
    });
};

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

module.exports = {actualizaResi, findAllResidentes, findResiById, deleteResidente, findResidenteByCi, findResiByName};