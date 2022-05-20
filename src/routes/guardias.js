const guardiasController = require('../controller/guardias');
const express = require('express');
const router = express.Router();

//todos guardias
router.get('/all', guardiasController.findAllGuardias);

//guardia por id
router.get('/:id', guardiasController.findGuardById);

//eliminar guardia
router.delete('/:id', guardiasController.deleteGuardia);

//buscar guardia por nombre
router.get('/search/name', guardiasController.findGuardByName);

module.exports = router;