//const mongoose = require('mongoose');
const Residente = require('../models/Residentes');
const { encrypt } = require('../helper/handleCrypt');


const byPage = (req, res)=>{
  const {name, ciudadela, etapa, villa} = req.body;
  let query={};
    if(name){
        query.name={ $regex: new RegExp(name), $options: "i" }
    }
    if(ciudadela){
        query.ciudadela={ $regex: new RegExp(ciudadela), $options: "i" }
    }
  if(etapa){
        query.etapa={ $regex: new RegExp(etapa), $options: "i" }
    }
  if(villa){
        query.villa={ $regex: new RegExp(villa), $options: "i" }
    }
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 4
  }
  Residente.paginate(query, options, (err, resi)=>{
    res.status(200).json({
      items: resi
    })
  });
}

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

//Busqueda usuario por villa
const findResiByVilla = (req, res) => {
    const villa = req.query.villa;
    var condition = villa ? { villa: { $regex: new RegExp(villa), $options: "i" } } : {};
    Residente.find(condition, (err, resi)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(resi);
    });
};

//Busqueda usuario por ciudadela
const findResiByCiudadela = (req, res) => {
    const ciudadela = req.query.ciudadela;
    var condition = ciudadela ? { ciudadela: { $regex: new RegExp(ciudadela), $options: "i" } } : {};
    Residente.find(condition, (err, resi)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(resi);
    });
};

//Busqueda usuario por etapa
const findResiByEtapa = (req, res) => {
    const etapa = req.query.etapa;
    var condition = etapa ? { etapa: { $regex: new RegExp(etapa), $options: "i" } } : {};
    Residente.find(condition, (err, resi)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(resi);
    });
};

const newResidente = async (req, res) => {
    const { user, pass, role, ciudadela, villa, name, celular, telefono, email, cedula, etapa, dvnet} = req.body;
    const resiIn = await Residente.findOne({ email });
    if(resiIn) {//return res.status(401).send("Residente exists");
        return res.send("Residente exists");
    }
    const passHash = await encrypt(pass);
    const newResi = new Residente({user, pass:passHash, role, ciudadela, villa, name, celular, cedula, telefono, email, etapa, dvnet});
    await newResi.save();
    res.status(200).json({newResi});
}

module.exports = {
  updateResi,
  findAllResidentes,
  findResiById,
  deleteResidente,
  findResiByCiudadela,
  findResiByEtapa,
  findResiByVilla,
  findResiByName,
  newResidente,
  byPage,
};