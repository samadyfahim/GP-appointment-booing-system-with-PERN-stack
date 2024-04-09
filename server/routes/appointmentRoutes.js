const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');

// Routes for appointments
// router.get('/', appointmentController.getAllAppointments);
// router.get('/:id', appointmentController.getAppointmentById);
// router.post('/', appointmentController.createAppointment);
// router.put('/:id', appointmentController.updateAppointmentById);
// router.delete('/:id', appointmentController.deleteAppointmentById);

// Get appointments for a patient
router.get('/patients/:patient_id/appointments', appointmentController.getAllAppointments);

// Get appointments for a doctor
router.get('/doctors/:doctor_id/appointments', appointmentController.getAllAppointments);


module.exports = router;
