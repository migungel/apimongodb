const Ciudadelas = require('../models/Ciudadelas');

//todas las Ciudadelas
const findAllCiudadelas = (req, res)=>{
    Ciudadelas.find((err, ciudadelas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(ciudadelas);
    });
};

const findCiudadelaById = (req, res) =>{
    Ciudadelas.findById(req.params.id, (err, ciudadela)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(ciudadela);
    });
};

const newCiudadela = async (req, res) => {
    const { name } = req.body;
    const ciudIn = await Ciudadelas.findOne({ name });
    if(ciudIn) {//return res.status(401).send("Ciudadela exists");
        return res.send("Ciudadela exists");
    }
    const newCiud = new Ciudadelas({name});
    await newCiud.save();
    res.status(200).json({newCiud});
}

module.exports = {
  findAllCiudadelas,
  findCiudadelaById,
  newCiudadela
};