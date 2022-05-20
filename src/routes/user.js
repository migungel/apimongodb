const userController = require("../controller/users");
const express = require("express");
const router = express.Router();

//inicar sesion
router.post('/signin', userController.iniciarSesion);

//buscar todos usuario por id
router.get('/:id', userController.findUserById);

module.exports = router;
