const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const Viviendas = require('../models/Viviendas');
const Ciudadelas = require('../models/Ciudadelas');
const Database = require('../models/Database');

const jwt = require('jsonwebtoken');

//router.get('/',(req, res) => res.send('Hello'))

router.post('/signup', async (req, res) =>{
    const { user, pass, role, ciudadela, code_villa, name, celular, ci} = req.body;
    const userIn = await User.findOne({ ci });
    if(userIn) return res.status(401).send("User exists");
    const newUser = new User({user, pass, role, ciudadela, code_villa, name, celular, ci});
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'key');
    res.status(200).json({token})
});


router.post('/signin', async (req, res)=>{
    const {user, pass} = req.body;
    const userIn = await User.findOne({ user });
    if(!userIn) return res.status(401).send("User doesn't exists");
    if(userIn.pass !== pass) return res.status(401).send("Wrong password");
    const token = jwt.sign({ _id: userIn._id }, 'key');
    res.status(200).json({token})
});

router.get('/users', (req, res)=>{
    User.find((err, users)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(users);
    });
});

router.get('/users/:id', (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(user);
    });
});


//Ciudadelas
router.get('/ciudadelas', (req, res)=>{
    Ciudadelas.find((err, ciudadelas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(ciudadelas);
    });
});

//update user
router.put('/users/:id', (req, res)=>{
    let userid = req.params.id;
    let update = req.body;
    User.findByIdAndUpdate(userid, update, (err, userUpdate) =>{
        if(err) err.status(500).send({message: `Error al actualizar el usuario: ${err}`});

        res.status(200).json({user: userUpdate});
    });
});


//Delete user
router.delete('/users/:id', (req, res)=>{
    let id = req.params.id;
    User.findById(id, (err, user)=>{
        if(err) err.status(500).send({message: `Error al borrar el usuario: ${err}`});

        user.remove(err => {
            if (err) err.status(500).send({message: `Error al borrar el usuario: ${err}`});
            res.status(200).send({message: 'El usuario ha sido eliminado'})
        })
    });
});


//Viviendas
router.get('/viviendas', async (req, res)=>{
    Viviendas.find((err, viviendas)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(viviendas);
    });
});

//crear viviendas
router.post('/viviendas', async (req, res)=>{
    const {manzana, villa, code_villa, ciudadela, descripcion, id_ciudadela, ciudadelaId} = req.body
    console.log(req.body);
    const ciud = await Ciudadelas.findById(ciudadelaId);
    if(code_villa) return res.status(401).send("Villa exists");
    const newVilla = new Villa({manzana, villa, code_villa, ciudadela, descripcion, id_ciudadela, ciudadelaId: ciud._id});
    await newUser.save();
    //Viviendas.find((err, viviendas)=>{
    //    err && res.status(500).send(err.message);
    //    res.status(200).json(viviendas);
    //});
});



//Busqueda ci
router.get("/userci/", (req, res) => {
    const ci = req.query.ci;
    var condition = ci ? { ci: { $regex: new RegExp(ci), $options: "i" } } : {};

    User.find(condition, (err, users)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(users);
    });
  }
);


//Busqueda usuario por nombre
router.get("/username/", (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    User.find(condition, (err, users)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(users);
    });
  
    //User.find(condition)
    //  .then(data => {
    //    res.send(data);
    //  })
    //  .catch(err => {
    //    res.status(500).send({
    //      message:
    //        err.message || "Some error occurred while retrieving tutorials."
    //    });
    //  });
  }
);

// busqueda vivienda por id_ciudadela
router.get("/residencias/", (req, res) => {
    const ciudadela = req.query.ciudadela;
    console.log(ciudadela);
    var condition = ciudadela ? { ciudadela: { $regex: new RegExp(ciudadela), $options: "i" } } : {};

    Viviendas.find(condition, (err, viv)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(viv);
    });
  }
);



//get all database
router.get('/database', async (req, res)=>{
    Ciudadelas.find( async (err, data)=>{
        err && res.status(500).send(err.message);
        //datauser = await Viviendas.aggregate([
        //    {
        //        $lookup:{
        //            from: 'users',
        //            localField: 'code_villa',
        //            foreignField: 'code_villa',
        //            as: 'usuarios'
        //        }
        //    }
        //]);
        data = await Ciudadelas.aggregate([
            /*{
                $match: {
               _id: "post1"}
            },*/
            {
                $lookup:{
                    from: 'viviendas',
                    localField: 'code',
                    foreignField: 'ciudadela',
                    as: 'viviendas'
                },
                
            },
            { $unwind: {
                path: "$viviendas",
                preserveNullAndEmptyArrays: false
              }
            },
            { $lookup:
                {
                    from: 'users',
                    localField: 'viviendas.code_villa',
                    foreignField: 'code_villa',
                    as: 'viviendas.users',
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    code: { $first: "$code" },
                    viviendas: { $push: "$viviendas" }
                }
            },
            {
                $project: {
                    id: 1,
                    name: 1,
                    code: 1,
                    viviendas: {
                        $filter: { input: "$viviendas", as: "a", cond: { $ifNull: ["$$a._id", false] } }
                      } 
                }
            },
        ]);
        res.status(200).json(data);
    })//.populate('viviendas');
    
    //const data = Database.find({}).populate('viviendas');
});


router.get('/database/:code', async (req, res)=>{
    let code = req.params.code;
    console.log(code);
    //Viviendas.findById(req.params.id, (err, user)=>{
    //    err && res.status(500).send(err.message);
    //    res.status(200).json(user);
    //});
    Ciudadelas.find( async (err, data)=>{
        err && res.status(500).send(err.message);
        data = await Ciudadelas.aggregate([
            { $match: { code: code } },
            {
                $lookup:{
                    from: 'viviendas',
                    localField: 'code',
                    foreignField: 'id_ciudadela',
                    as: 'viviendas'
                },
                
            },
            { $unwind: {
                path: "$viviendas",
                preserveNullAndEmptyArrays: false
              }
            },
            { $lookup:
                {
                    from: 'users',
                    localField: 'viviendas.code_villa',
                    foreignField: 'code_villa',
                    as: 'viviendas.users',
                }
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    code: { $first: "$code" },
                    viviendas: { $push: "$viviendas" }
                }
            },
            {
                $project: {
                    id: 1,
                    name: 1,
                    code: 1,
                    viviendas: {
                        $filter: { input: "$viviendas", as: "a", cond: { $ifNull: ["$$a._id", false] } }
                      } 
                }
            },
        ]);
        res.status(200).json(data);
    })
});



module.exports = router