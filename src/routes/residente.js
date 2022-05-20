const residenteController = require("../controller/residentes");
const express = require("express");
const router = express.Router();

//actualizar residente
router.put('/:id', residenteController.actualizaResi);

//todos los residentes
router.get('/all', residenteController.findAllResidentes);

//residente por id
router.get('/:id', residenteController.findResiById);

//eliminar residente
router.delete('/:id', residenteController.deleteResidente);

//buscar por residente por nombre
router.get('/search/name', residenteController.findResiByName);

//buscar por residente por ci
router.get('/search/ci', residenteController.findResidenteByCi);

module.exports = router;
