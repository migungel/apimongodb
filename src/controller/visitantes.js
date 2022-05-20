const Visitantes = require('../models/Visitantes');

//todas las solicitudes de los visitantes
const findAllVisitantes = (req, res)=>{
    Visitantes.find((err, visitors)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(visitors);
    });
};

//encontrar visitantes por ID
const findVisitorById = (req, res)=>{
    Visitantes.findById(req.params.id, (err, visit)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(visit);
    });
};

//Delete visitante
const deleteVisitante = (req, res)=>{
    let id = req.params.id;
    Visitantes.findById(id, (err, visit)=>{
        if(err) err.status(500).send({message: `Error al borrar al visitante: ${err}`});

        visit.remove(err => {
            if (err) err.status(500).send({message: `Error al borrar al visitante: ${err}`});
            res.status(200).send({message: 'El visitante ha sido eliminado'})
        })
    });
};

//Busqueda visitante por nombre
const findVisitByName = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Visitantes.find(condition, (err, visit)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(visit);
    });
};

//actualizar visitante
const updateVisit = (req, res)=>{
    let visitanteid = req.params.id;
    let update = req.body;
    Visitantes.findByIdAndUpdate(visitanteid, update, (err, visitUpdate) =>{
        if(err) err.status(500).send({message: `Error al actualizar el visitante: ${err}`});

        res.status(200).json({user: visitUpdate});
    });
};

//registrar visitante
const createVisit = async (req, res) =>{
    const {id_residente, name, cedula, celular, placa, ingreso, salida, state} = req.body;
    //const visitIn = await Visitantes.findOne({ state });
    //if(userIn) return res.status(401).send("User exists");
    const newVisit = new Visitantes({id_residente, name, cedula, celular, placa, ingreso, salida, state});
    await newVisit.save();
    //const token = jwt.sign({ _id: newUser._id }, 'key');
    const idVisit = newVisit._id;
    //res.status(200).json({token, id})
    res.status(200).json({ idVisit });
};

module.exports = {
    findAllVisitantes,
    findVisitorById,
    deleteVisitante,
    findVisitByName,
    updateVisit,
    createVisit
};