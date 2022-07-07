const ciudadelasController = require('../controller/ciudadelas');
const express = require('express');
const router = express.Router();

//todas las ciudadelas
router.get('/all', ciudadelasController.findAllCiudadelas);

//crear nueva ciudadela
router.post('/new', ciudadelasController.newCiudadela);

//ciudadelas por ID
router.get('/:id', ciudadelasController.findCiudadelaById);

module.exports = router;