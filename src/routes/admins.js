const adminController = require('../controller/admins');
const express = require("express");
const router = express.Router();

router.post('/page', adminController.byPage);

//todos los admin
router.get('/all', adminController.findAllAdmins);

//crear nuevo admin
router.post('/new', adminController.newAdmin);

//actualizar admin
router.put('/:id', adminController.updateAdmin);

//admin por id
router.get('/:id', adminController.findAdminById);

//eliminar admin
router.delete('/:id', adminController.deleteAdmin);

//buscar por admin por nombre
router.get('/search/name', adminController.findAdminByName);

module.exports = router;
