const express = require('express');
const router = express.Router();
const doctorAvailabilityController = require('../controllers/DoctorAvailabilityController');

// Routes for doctor availabilities
router.get('/', doctorAvailabilityController.getAllDoctorAvailabilities);
router.get('/:id', doctorAvailabilityController.getDoctorAvailabilityById);
router.post('/', doctorAvailabilityController.createDoctorAvailability);
router.put('/:id', doctorAvailabilityController.updateDoctorAvailabilityById);
router.delete('/:id', doctorAvailabilityController.deleteDoctorAvailabilityById);

module.exports = router;
