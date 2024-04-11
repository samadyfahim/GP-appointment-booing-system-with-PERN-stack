const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const { authenticateToken } = require("../middleware/authenticateToken");


// Routes for appointments
// router.get('/', appointmentController.getAllAppointments);
// router.get('/:id', appointmentController.getAppointmentById);
// router.post('/', appointmentController.createAppointment);
// router.put('/:id', appointmentController.updateAppointmentById);
// router.delete('/:id', appointmentController.deleteAppointmentById);

// Get appointments for a patient

// Get appointments for a doctor
router.get('/doctors/appointments', appointmentController.getAllAppointments);


module.exports = router;
