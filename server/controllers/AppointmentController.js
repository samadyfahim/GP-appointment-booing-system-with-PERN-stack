const { Appointment, Patient, Doctor, User, Profile, AppointmentStatus } = require('../models');
const appointmentService = require('../services/appointmentService');


// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_datetime, status_id, provider_id } = req.body;
  try {
    const appointment = await Appointment.create({ patient_id, doctor_id, appointment_datetime, status_id, provider_id });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { patient_id } = req.params;
  const { status_name } = req.body; // Assuming status_name is provided in the request body
  try {
    const result = await updateAppointmentStatusForPatient(patient_id, status_name);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update appointment statuses' });
  }
};

// Delete appointment by ID
exports.deleteAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.destroy();
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get appointments for a specific user
exports.getUserAppointments = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a parameter
  try {
    const appointments = await Appointment.findAll({
      where: { userId }, // Query appointments where userId matches
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


