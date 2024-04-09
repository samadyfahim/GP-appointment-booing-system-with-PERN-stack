const { Appointment, AppointmentStatus, Patient } = require('../models');

// Get all appointment statuses
exports.getAllAppointmentStatuses = async (req, res) => {
  try {
    const appointmentStatuses = await AppointmentStatus.findAll();
    res.json(appointmentStatuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get appointment status by ID
exports.getAppointmentStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointmentStatus = await AppointmentStatus.findByPk(id);
    if (!appointmentStatus) {
      return res.status(404).json({ message: 'Appointment status not found' });
    }
    res.json(appointmentStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create new appointment status
exports.createAppointmentStatus = async (req, res) => {
  const { status_name, provider_id } = req.body;
  try {
    const appointmentStatus = await AppointmentStatus.create({ status_name, provider_id });
    res.status(201).json(appointmentStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update appointment status by ID
exports.updateAppointmentStatusById = async (req, res) => {
  const { id } = req.params;
  const { status_name } = req.body;
  try {
    let appointmentStatus = await AppointmentStatus.findByPk(id);
    if (!appointmentStatus) {
      return res.status(404).json({ message: 'Appointment status not found' });
    }
    appointmentStatus = await appointmentStatus.update({ status_name, provider_id });
    res.json(appointmentStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Update appointment status for a user who is a patient
exports.updateAppointmentStatusForUser = async (user_id, status_name) => {
  try {
    // Find the patient associated with the user
    const patient = await Patient.findOne({ where: { user_id } });
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Find the status ID based on the provided status name
    const status = await AppointmentStatus.findOne({ where: { status_name } });
    if (!status) {
      throw new Error('Status not found');
    }

    // Find all appointments for the patient
    const appointments = await Appointment.findAll({ where: { patient_id: patient.id } });

    // Update the status of each appointment
    await Promise.all(appointments.map(async appointment => {
      appointment.status_id = status.id;
      await appointment.save();
    }));

    return { message: 'Appointment statuses updated successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update appointment statuses');
  }
};

// Delete appointment status by ID
exports.deleteAppointmentStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointmentStatus = await AppointmentStatus.findByPk(id);
    if (!appointmentStatus) {
      return res.status(404).json({ message: 'Appointment status not found' });
    }
    await appointmentStatus.destroy();
    res.json({ message: 'Appointment status deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
