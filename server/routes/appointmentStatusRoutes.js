const express = require('express');
const router = express.Router();
const appointmentStatusController = require('../controllers/AppointmentStatusController');

// Routes for appointment statuses
router.get('/', appointmentStatusController.getAllAppointmentStatuses);
router.get('/:id', appointmentStatusController.getAppointmentStatusById);
router.post('/', appointmentStatusController.createAppointmentStatus);
router.put('/:id', appointmentStatusController.updateAppointmentStatusById);
router.delete('/:id', appointmentStatusController.deleteAppointmentStatusById);

module.exports = router;
