const express = require('express');
const router = express.Router();
const contactInformationController = require('../controllers/ContactInformationController');

// Routes for contact information
router.get('/', contactInformationController.getAllContactInformation);
router.get('/:id', contactInformationController.getContactInformationById);
router.post('/', contactInformationController.createContactInformation);
router.put('/:id', contactInformationController.updateContactInformationById);
router.delete('/:id', contactInformationController.deleteContactInformationById);

module.exports = router;
