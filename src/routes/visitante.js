const visitanteController = require("../controller/visitantes");
const express = require("express");
const router = express.Router();
//import upload from '../libs/multer'
const upload = require('../lib/multer');

//todos visitantes
router.get('/all', visitanteController.findAllVisitantes);

//Crear nuevo visitante
router.post('/new', visitanteController.createVisit);
//router.post('/new', upload.single('image'), visitanteController.createVisit);
//router.route('/new').post(upload.single('image'), visitanteController.createVisit);

//buscar visitante por nombre
router.get('/search/name', visitanteController.findVisitByName);

//buscar visitante por residente
router.get('/search/residente', visitanteController.findVisitByResidente);

//buscar visitante por rango fecha
router.post('/rangeDate', visitanteController.findVisitByRangeDate);

//actualizar el estado y la foto
router.put('/foto/:id', upload.single('image'), visitanteController.updateFoto);

//buscar visitante por id
router.get('/:id', visitanteController.findVisitorById);

//eliminar visitante por id
router.delete('/:id', visitanteController.deleteVisitante);

//actualizar estado visitante
router.put('/:id', visitanteController.updateExit);

module.exports = router;