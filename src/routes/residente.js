const residenteController = require("../controller/residentes");
const express = require("express");
const router = express.Router();

//todos los residentes
router.get('/all', residenteController.findAllResidentes);

//crear residente
router.post('/new', residenteController.newResidente);

//residente por id
router.get('/:id', residenteController.findResiById);

//eliminar residente
router.delete('/:id', residenteController.deleteResidente);

//buscar por residente por nombre
router.get('/search/name', residenteController.findResiByName);

//actualizar residente
router.put('/:id', residenteController.updateResi);

module.exports = router;
