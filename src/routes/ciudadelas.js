const ciudadelasController = require('../controller/ciudadelas');
const express = require('express');
const router = express.Router();

//todas las ciudadelas
router.get('/all', ciudadelasController.findAllCiudadelas);

//ciudadelas por code
router.get('/search', ciudadelasController.findCiudadelaByCode);

module.exports = router;