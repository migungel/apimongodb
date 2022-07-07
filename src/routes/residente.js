const residenteController = require("../controller/residentes");
const express = require("express");
const router = express.Router();


router.post('/page', residenteController.byPage);

//todos los residentes
router.get('/all', residenteController.findAllResidentes);

//crear residente
router.post('/new', residenteController.newResidente);

//buscar por residente por nombre
router.get('/search/name', residenteController.findResiByName);

//buscar residente por villa
router.get('/search/villa', residenteController.findResiByVilla);

//buscar residente por ciudadela
router.get('/search/ciudadela', residenteController.findResiByCiudadela);

//buscar residente por ciudadela
router.get('/search/etapa', residenteController.findResiByEtapa);

//residente por id
router.get('/:id', residenteController.findResiById);

//eliminar residente
router.delete('/:id', residenteController.deleteResidente);

//actualizar residente
router.put('/:id', residenteController.updateResi);

module.exports = router;
