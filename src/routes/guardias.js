const guardiasController = require('../controller/guardias');
const express = require('express');
const router = express.Router();

router.post('/page', guardiasController.byPage);

//todos guardias
router.get('/all', guardiasController.findAllGuardias);

//nuevo guardia
router.post('/new', guardiasController.newGuard);

//buscar guardia por nombre
router.get('/search/name', guardiasController.findGuardByName);

//buscar guardia por ciudadela
router.get('/search/ciudadela', guardiasController.findGuardByCiudadela);

//buscar guardia por etapa
router.get('/search/etapa', guardiasController.findGuardByEtapa);

//guardia por id
router.get('/:id', guardiasController.findGuardById);

//eliminar guardia
router.delete('/:id', guardiasController.deleteGuardia);

//actualizar guardia
router.put('/:id', guardiasController.updateGuard);

module.exports = router;