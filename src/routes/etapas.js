const etapasController = require('../controller/etapas');
const express = require('express');
const router = express.Router();

//registrar etapa
router.post('/registrar', etapasController.registerEtapas);

//todas las etapas
router.get('/all', etapasController.findAllEtapas);

//etapa por ciudadela
router.get('/search', etapasController.findEtapasByCiudadela);

module.exports = router;