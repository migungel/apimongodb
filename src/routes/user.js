const userController = require("../controller/users");
const express = require("express");
const router = express.Router();

//inicar sesion
router.post('/login', userController.iniciarSesion);

//nuevo usuario
router.post('/new', userController.newUser);

//buscar todos usuario por id
router.get('/:id', userController.findUserById);

module.exports = router;
