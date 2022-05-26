const guardiasController = require('../controller/guardias');
const express = require('express');
const router = express.Router();

//todos guardias
router.get('/all', guardiasController.findAllGuardias);

//nuevo guardia
router.post('/new', guardiasController.newGuard);

//guardia por id
router.get('/:id', guardiasController.findGuardById);

//eliminar guardia
router.delete('/:id', guardiasController.deleteGuardia);

//buscar guardia por nombre
router.get('/search/name', guardiasController.findGuardByName);

//actualizar guardia
router.put('/:id', guardiasController.updateGuard);

module.exports = router;