const ciudadelasController = require('../controller/ciudadelas');
const express = require('express');
const router = express.Router();

//todas las ciudadelas
router.get('/all', ciudadelasController.findAllCiudadelas);

//ciudadelas por code
router.get('/search/code', ciudadelasController.findCiudadelaByCode);

//ciudadelas por ID
router.get('/:id', ciudadelasController.findCiudadelaById);

module.exports = router;