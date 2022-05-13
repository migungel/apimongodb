const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const Viviendas = require('../models/Viviendas');
const Ciudadelas = require('../models/Ciudadelas');

const jwt = require('jsonwebtoken');

//router.get('/',(req, res) => res.send('Hello'))

router.post('/signup', async (req, res) =>{
    const { user, pass } = req.body;
    const newUser = new User({user, pass});
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
    User.findById(userid, update, (err, user) =>{
        if(err) err.status(500).send({message: `Error al borrar el usuario: ${err}`});
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

    /*
    User.findById(req.params.id, (err, user)=>{
        err && res.status(500).send(err.message);
        res.status(200).json(user);
    });
    */
});


module.exports = router