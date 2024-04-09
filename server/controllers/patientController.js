const { Patient } = require('../models');
const appointmentService = require('../services/appointmentService');



// Controller function to get appointments for a patient with a specific status
exports.getAppointmentsForPatientWithStatus = async (req, res) => {
  const { patient_id } = req.params;
  const { statusName } = req.query; // Extract status name from request query parameters
  if (!statusName) {
    return res.status(400).json({ message: 'Status name is required' });
  }
  try {
    const appointments = await appointmentService.getAppointmentsForPatientWithStatus(patient_id, statusName);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};
// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Create a new patient
exports.createPatient = async (req, res) => {
  const { user_id } = req.body;
  try {
    const patient = await Patient.create({ user_id });
    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update patient by ID
exports.updatePatientById = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  try {
    let patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    patient = await patient.update({ user_id });
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete patient by ID
exports.deletePatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
