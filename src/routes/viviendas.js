const viviendaController = require('../controller/viviendas');
const express = require('express');
const router = express.Router();

//toas Viviendas
router.get('/all', viviendaController.findAllViviendas);

//crear viviendas
router.post('/new', viviendaController.newViviendas);

//busqueda viviendas por su etapa
router.get("/search/etapa", viviendaController.findViviendaByEtapa);
//router.get("/ciudadela/:id", viviendaController.findViviendaByCiudadela);

//busqueda viviendas por su etapa
router.get("/search/manzana", viviendaController.findViviendaByManzana);

//busqueda viviendas por ID
router.get("/:id", viviendaController.findViviendaById);

//actualizar vivienda
router.put("/:id", viviendaController.updateVivienda);

//eliminar vivienda
router.delete("/:id", viviendaController.deleteVivienda);

module.exports = router;
