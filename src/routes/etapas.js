const etapasController = require('../controller/etapas');
const express = require('express');
const router = express.Router();

//registrar etapa
router.post('/new', etapasController.newEtapa);

//todas las etapas
router.get('/all', etapasController.findAllEtapas);

//etapas por nombre
router.get('/name', etapasController.findEtapasByName);

//etapa por ciudadela
router.get('/ciudadela', etapasController.findEtapasByCiudadela);

//todas las etapas
router.get('/:id', etapasController.findEtapasById);

//borrar la etapa
router.delete('/:id', etapasController.deleteEtapa);

module.exports = router;