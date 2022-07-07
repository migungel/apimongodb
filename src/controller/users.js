const Residentes = require('../models/Residentes');
const residenteController = require('./residentes');
const Guardias = require('../models/Guardias');
const Admins = require('../models/Admins');
const { compare } = require('../helper/handleCrypt');
const jwt = require('jsonwebtoken');

//inicar sesion
const iniciarSesion = async (req, res)=>{
    const {user, pass} = req.body;
    const residenteIn = await Residentes.findOne({ email:user });
    const guardiaIn = await Guardias.findOne({ user });
    const adminIn = await Admins.findOne({ user });
    let userIn = {};
    //if (residenteIn && (residenteIn.pass === pass))
  if (residenteIn && (await compare(pass, residenteIn.pass))){userIn = residenteIn;}
    else if(guardiaIn && (await compare(pass, guardiaIn.pass))){userIn = guardiaIn;}
    else if(adminIn && (await compare(pass, adminIn.pass))){userIn = adminIn;}
      
    else {//return res.status(401).send("Wrong user or password");
      return res.send("Wrong user or password");
    }
  //console.log(residenteIn);
    const token = jwt.sign(
      {
        //userIn
        _id: userIn._id,
        role: userIn.role,
        name: userIn.name
      }, 'key');
    const id = userIn._id;
    res.status(200).json({token, id});
};

//todos los usuarios
const findUserById = async (req, res)=>{
    const idUser = req.params.id;
    const residenteIn = await Residentes.findOne({ _id: idUser });
    const guardiaIn = await Guardias.findOne({ _id: idUser });
    const adminIn = await Admins.findOne({ _id: idUser });
    var userIn = {};
    if (residenteIn) userIn = residenteIn;
    else if(guardiaIn) userIn = guardiaIn;
    else if(adminIn) userIn = adminIn;
  else {//return res.status(401).send("User no exists");
    return res.send("User no exists");  
  }
    res.status(200).json(userIn);
};

const newUser = async (req, res) => {
    const {user} = req.body;
    const residenteIn = await Residentes.findOne({ email:user });
    const guardiaIn = await Guardias.findOne({ user });
    const adminIn = await Admins.findOne({ user });
    if(residenteIn) return res.send("Residente exists");
    if(guardiaIn) return res.send("Guardia exists");
    if(adminIn) return res.send("Admin exists");
    //res.status(200).send('usuario no existe');
    res.status(200).json({user});
};

module.exports = {iniciarSesion, findUserById, newUser};