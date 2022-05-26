const userController = require("../controller/users");
const express = require("express");
const router = express.Router();

//inicar sesion
router.post('/signin', userController.iniciarSesion);

//buscar todos usuario por id
router.get('/user/:id', userController.findUserById);

//nuevo usuario
router.post('/new', userController.newUser);

module.exports = router;
