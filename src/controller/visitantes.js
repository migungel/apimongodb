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
        if(err) res.status(500).send({message: `Error al borrar al visitante: ${err}`});

        visit.remove(error => {
            if (error) res.status(500).send({message: `Error al borrar al visitante: ${error}`});
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

//registrar visitante
const createVisit = async (req, res) =>{
    const {residente, name, cedula, celular, tipo, placa, ingreso, salida, state, imagePath} = req.body;
    //console.log('file: ', req.file);
    //console.log('body: ', req.body);
    //const newVisit = new Visitantes({residente, name, cedula, celular, tipo, placa, ingreso, salida, state, imagePath: req.file.path});
    const newVisit = new Visitantes({residente, name, cedula, celular, tipo, placa, ingreso, salida, state, imagePath});
    await newVisit.save();
    const idVisit = newVisit._id;
    res.status(200).json({ idVisit });
    //res.status(200).json('nice');
};

//actualizar estado fecha
//const updateByDate = (req, res)=>{
//  let visitaid = req.params.id;
//  let update = req.body;
//  console.log(update);
//  Visitantes.findByIdAndUpdate(visitaid, update, (err, visitUpdate) =>{
//      if(err) err.status(500).send({message: `Error al actualizar el estado de la visita: ${err}`});
//      res.status(200).json({visitUpdate});
//  });
//};

//actualizar estado visita
const updateExit = (req, res)=>{
    let visitaid = req.params.id;
    let update = req.body;
    console.log(update);
    Visitantes.findByIdAndUpdate(visitaid, update, (err, visitUpdate) =>{
        if(err) err.status(500).send({message: `Error al actualizar el estado de la visita: ${err}`});
        res.status(200).json({visitUpdate});
    });
};

//actualizar estado, foto visita
const updateFoto = (req, res)=>{
  let visitaid = req.params.id;
  let update = req.body;
  let imagePath = req.file.path;
  update['imagePath'] = imagePath;
  Visitantes.findByIdAndUpdate(visitaid, update, (err, visitUpdate) =>{
      if(err) err.status(500).send({message: `Error al actualizar el estado de la visita: ${err}`});
      res.status(200).json({visitUpdate});
  });
};

//Busqueda visitante por rango de fecha
const findVisitByRangeDate = (req, res) => {
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 4
  }
  let query = {}
  const {residente, residenteArray} = req.body;
  if(residente){
    query.residente={ $regex: new RegExp(residente), $options: "i" }
    }
  if(residenteArray){
    query.residente={ "$regex": residenteArray.join("|"), "$options": "i" }
    }
  var startDate = req.body.startDate+"T00:00:00.000Z";
  var endDate = req.body.endDate+"T23:59:59.000Z";
  query.createdAt = {
                $gte: new Date(startDate).toISOString(),
                $lte: new Date(endDate).toISOString()
            }
  //console.log(query)
  Visitantes.paginate(query, options, (err, visit)=>{
    res.status(200).json({
      items: visit
    })
  });
  
  //Visitantes.
    //find({
      //      createdAt: {
      //          $gte: new Date(startDate).toISOString(),
      //          $lte: new Date(endDate).toISOString()
      //      }
      //  })
      //  .exec(function (err, data) {
      //      if (err) return console.log(err);
      //      res.send(data);
      //  });
};

//Busqueda visitante por residente
const findVisitByResidente = (req, res) => {
    const residente = req.query.residente;
    var condition = residente ? { residente: { $regex: new RegExp(residente), $options: "i" } } : {};
    Visitantes.find(condition, (err, visit)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(visit);
    });
};

module.exports = {
    findAllVisitantes,
    findVisitorById,
    deleteVisitante,
    findVisitByName,
    createVisit,
    updateExit,
    updateFoto,
  findVisitByRangeDate,
  findVisitByResidente,
};