const express = require('express');
const router = express.Router();
const healthcareProviderController = require('../controllers/HealthcareProviderController');

// Routes for healthcare providers
router.get('/', healthcareProviderController.getAllHealthcareProviders);
router.get('/:id', healthcareProviderController.getHealthcareProviderById);
router.post('/', healthcareProviderController.createHealthcareProvider);
router.put('/:id', healthcareProviderController.updateHealthcareProviderById);
router.delete('/:id', healthcareProviderController.deleteHealthcareProviderById);

module.exports = router;
