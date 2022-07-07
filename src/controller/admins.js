const Admins = require('../models/Admins');
const { encrypt } = require('../helper/handleCrypt');

const byPage = (req, res)=>{
  const {name, ciudadela} = req.body;
  let query={};
    if(name){
        query.name={ $regex: new RegExp(name), $options: "i" }
    }
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 4
  }
  Admins.paginate(query, options, (err, resi)=>{
    res.status(200).json({
      items: resi
    })
  });
}

//actualizar residente
const updateAdmin = (req, res)=>{
    let adminid = req.params.id;
    let update = req.body;
    Admins.findByIdAndUpdate(adminid, update, (err, admin) =>{
        if(err) err.status(500).send({message: `Error al actualizar el usuario: ${err}`});

        res.status(200).json({ admin });
    });
};

//residentes
const findAllAdmins = (req, res)=>{
    Admins.find((err, admin)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(admin);
    });
};

//encontrar admins por ID
const findAdminById = (req, res)=>{
    Admins.findById(req.params.id, (err, admin)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(admin);
    });
};

//Delete Residente
const deleteAdmin = (req, res)=>{
    let id = req.params.id;
    Admins.findById(id, (err, admin)=>{
        if(err) err.status(500).send({message: `Error al borrar el usuario: ${err}`});

        admin.remove(err => {
            if (err) err.status(500).send({message: `Error al borrar el usuario: ${err}`});
            res.status(200).send({message: 'El usuario ha sido eliminado'})
        })
    });
};


//Busqueda usuario por nombre
const findAdminByName = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Admins.find(condition, (err, admin)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(admin);
    });
};

//crear admin
const newAdmin = async (req, res) =>{
    const { name, user, pass, role, cedula, celular, ciudadelasCargo} = req.body;
    const adminIn = await Admins.findOne({ user });
    if(adminIn) {//return res.status(401).send("Admin exists");
        return res.send("Admin exists");
    }
  const passHash = await encrypt(pass);
    const newAdmin = new Admins({name, user, pass:passHash, role, cedula, celular, ciudadelasCargo });
    await newAdmin.save();
    res.status(200).json({newAdmin});
};

module.exports = {updateAdmin, findAllAdmins, findAdminById, deleteAdmin, findAdminByName, newAdmin, byPage};