const Guardias = require('../models/Guardias');

//guardias
const newGuard = async (req, res)=>{
    const {name, cedula, celular, user, pass, role, ciudadela, etapa} = req.body;
    const guardIn = await Guardias.findOne({ user });
    if(guardIn) return res.status(401).send("Residente exists");
    const newGuard = new Guardias({name, cedula, celular, user, pass, role, ciudadela, etapa});
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

module.exports = {
    newGuard,
    findAllGuardias,
    findGuardById,
    deleteGuardia,
    findGuardByName,
    updateGuard,
};