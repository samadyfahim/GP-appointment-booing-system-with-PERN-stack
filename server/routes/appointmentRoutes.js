const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticateToken");
const AppointmentRequestController = require("../controllers/AppointmentRequestController");
const appointmentsController = require("../controllers/AddressController");

router.post(
  "/appointment/appointmentRequestForm",
  authenticateToken,
  AppointmentRequestController.createAppointmentRequest
);
router.get(
  "/appointment/appointmentRequests",
  authenticateToken,
  AppointmentRequestController.getAllAppointmentRequests
);

router.put(
  "/appointment/appointments/:id/cancel",
  appointmentsController.cancelAppointment
);
module.exports = router;
