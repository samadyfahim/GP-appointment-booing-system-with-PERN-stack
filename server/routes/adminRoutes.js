const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// Routes for admins
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdminById);
router.delete('/:id', adminController.deleteAdminById);

module.exports = router;
