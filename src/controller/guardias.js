const Guardias = require('../models/Guardias');

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

module.exports = {findAllGuardias, findGuardById, deleteGuardia, findGuardByName};