const Residentes = require('../models/Residentes');
const residenteController = require('./residentes');
const Guardias = require('../models/Guardias');
const Admins = require('../models/Admins');
const jwt = require('jsonwebtoken');

//inicar sesion
const iniciarSesion = async (req, res)=>{
    const {user, pass} = req.body;
    const residenteIn = await Residentes.findOne({ user });
    const guardiaIn = await Guardias.findOne({ user });
    const adminIn = await Admins.findOne({ user });
    var userIn = {};
    if (residenteIn && (residenteIn.pass === pass))userIn = residenteIn;
    else if(guardiaIn && (guardiaIn.pass === pass))userIn = guardiaIn;
    else if(adminIn && (adminIn.pass === pass))userIn = adminIn;
    else return res.status(401).send("Wrong user or password");
    const token = jwt.sign({ _id: userIn._id }, 'key');
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
    //const id = userIn._id;
    res.status(200).json(userIn);
};

const newUser = async (req, res) => {
    const {user} = req.body;
    console.log(req.body);
    //const { user} = req.body;
    const residenteIn = await Residentes.findOne({ user });
    const guardiaIn = await Guardias.findOne({ user });
    const adminIn = await Admins.findOne({ user });
    //console.log(adminIn);
    if(residenteIn) return res.status(401).send("Residente exists");
    if(guardiaIn) return res.status(401).send("Guardia exists");
    if(adminIn) return res.status(401).send("Admin exists");
    res.status(200).send('usuario no existe');
};

module.exports = {iniciarSesion, findUserById, newUser};