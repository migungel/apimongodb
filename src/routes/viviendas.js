const viviendaController = require('../controller/viviendas');
const express = require('express');
const router = express.Router();

//toas Viviendas
router.get('/all', viviendaController.findAllViviendas);

//crear viviendas
router.post('/registrar', viviendaController.createViviendas);

//busqueda viviendas por su ciudadelas
router.get("/viviendas", viviendaController.findViviendaByCiudadela);

module.exports = router;
