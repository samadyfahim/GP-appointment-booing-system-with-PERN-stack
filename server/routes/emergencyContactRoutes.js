const express = require('express');
const router = express.Router();
const emergencyContactController = require('../controllers/EmergencyContactController');

// Routes for emergency contacts
router.get('/', emergencyContactController.getAllEmergencyContacts);
router.get('/:id', emergencyContactController.getEmergencyContactById);
router.post('/', emergencyContactController.createEmergencyContact);
router.put('/:id', emergencyContactController.updateEmergencyContactById);
router.delete('/:id', emergencyContactController.deleteEmergencyContactById);

module.exports = router;
