const visitanteController = require("../controller/visitantes");
const express = require("express");
const router = express.Router();

//todos visitantes
router.get('/all', visitanteController.findAllVisitantes);

//Crear nuevo visitante
router.post('/nuevo', visitanteController.createVisit);

//buscar visitante por id
router.get('/:id', visitanteController.findVisitorById);

//eliminar visitante por id
router.delete('/:id', visitanteController.deleteVisitante);

//buscar visitante por nombre
router.get('/search/name', visitanteController.findVisitByName);

//actualizarr visitante
router.put('/:id', visitanteController.updateVisit);

module.exports = router;