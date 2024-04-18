const { Doctor } = require('../models');
const appointmentService = require('../services/appointmentService');

// Controller function to get appointments for a doctor with a specific status
exports.getAppointmentsForDoctorWithStatus = async (req, res) => {
  const { doctor_id } = req.params;
  const { statusName } = req.query;
  try {
    const appointments = await appointmentService.getAppointmentsForDoctorWithStatus(doctor_id, statusName);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

