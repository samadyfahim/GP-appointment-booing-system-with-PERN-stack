const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const { authenticateToken } = require("../middleware/authenticateToken");




router.get('/doctors/appointments', appointmentController.getAllAppointments);


module.exports = router;
