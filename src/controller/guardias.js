const Guardias = require('../models/Guardias');
const { encrypt } = require('../helper/handleCrypt');

const byPage = (req, res)=>{
  const {name, ciudadela, etapa} = req.body;
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
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 4
  }
  Guardias.paginate(query, options, (err, resi)=>{
    res.status(200).json({
      items: resi
    })
  });
}

//guardias
const newGuard = async (req, res)=>{
    const {name, cedula, celular, user, pass, role, ciudadela, etapa} = req.body;
    const guardIn = await Guardias.findOne({ user });
    if(guardIn) {//return res.status(401).send("Residente exists");
        return res.send("Residente exists");
    }
  const passHash = await encrypt(pass);
    const newGuard = new Guardias({name, cedula, celular, user, pass:passHash, role, ciudadela, etapa});
    await newGuard.save();
    res.status(200).json({newGuard});
};

const updateGuard = (req, res)=>{
    let guardid = req.params.id;
    let update = req.body;
    Guardias.findByIdAndUpdate(guardid, update, (err, guard) =>{
        if(err) err.status(500).send({message: `Error al actualizar el usuario: ${err}`});

        res.status(200).json({guard});
    });
};

//guardias
const findAllGuardias = (req, res)=>{
    Guardias.find((err, guard)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(guard);
    });
};

//encontrar guardia por ID
const findGuardById = (req, res)=>{
    Guardias.findById(req.params.id, (err, guard)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(guard);
    });
};

//Delete guardia
const deleteGuardia = (req, res)=>{
    let id = req.params.id;
    Guardias.findById(id, (err, guard)=>{
        if(err) err.status(500).send({message: `Error al borrar el guardia: ${err}`});

        guard.remove(err => {
            if (err) err.status(500).send({message: `Error al borrar el guardia: ${err}`});
            res.status(200).send({message: 'El guardia ha sido eliminado'})
        })
    });
};

//Busqueda guardia por nombre
const findGuardByName = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Guardias.find(condition, (err, guard)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(guard);
    });
};

//Busqueda guardia por ciudadela
const findGuardByCiudadela = (req, res) => {
    const ciudadela = req.query.ciudadela;
    var condition = ciudadela ? { ciudadela: { $regex: new RegExp(ciudadela), $options: "i" } } : {};
    Guardias.find(condition, (err, guard)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(guard);
    });
};

//Busqueda guardia por etapa
const findGuardByEtapa = (req, res) => {
    const etapa = req.query.etapa;
    var condition = etapa ? { etapa: { $regex: new RegExp(etapa), $options: "i" } } : {};
    Guardias.find(condition, (err, guard)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(guard);
    });
};

module.exports = {
    newGuard,
    findAllGuardias,
    findGuardById,
    deleteGuardia,
    findGuardByName,
    updateGuard,
  findGuardByCiudadela,
  findGuardByEtapa,
  byPage
};