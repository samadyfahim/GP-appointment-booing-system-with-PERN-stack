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

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  const { user_id, specialization } = req.body;
  try {
    const doctor = await Doctor.create({ user_id, specialization });
    res.status(201).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update doctor by ID
exports.updateDoctorById = async (req, res) => {
  const { id } = req.params;
  const { user_id, specialization } = req.body;
  try {
    let doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    doctor = await doctor.update({ user_id, specialization });
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete doctor by ID
exports.deleteDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await doctor.destroy();
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
