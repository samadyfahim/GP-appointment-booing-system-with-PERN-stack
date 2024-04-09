const { DoctorAvailability } = require('../models');

// Get all doctor availabilities
exports.getAllDoctorAvailabilities = async (req, res) => {
  try {
    const doctorAvailabilities = await DoctorAvailability.findAll();
    res.json(doctorAvailabilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get doctor availability by ID
exports.getDoctorAvailabilityById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctorAvailability = await DoctorAvailability.findByPk(id);
    if (!doctorAvailability) {
      return res.status(404).json({ message: 'Doctor availability not found' });
    }
    res.json(doctorAvailability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new doctor availability
exports.createDoctorAvailability = async (req, res) => {
  const { doctor_id, available_date, available_start_time, available_end_time } = req.body;
  try {
    const doctorAvailability = await DoctorAvailability.create({ doctor_id, available_date, available_start_time, available_end_time });
    res.status(201).json(doctorAvailability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update doctor availability by ID
exports.updateDoctorAvailabilityById = async (req, res) => {
  const { id } = req.params;
  const { doctor_id, available_date, available_start_time, available_end_time } = req.body;
  try {
    let doctorAvailability = await DoctorAvailability.findByPk(id);
    if (!doctorAvailability) {
      return res.status(404).json({ message: 'Doctor availability not found' });
    }
    doctorAvailability = await doctorAvailability.update({ doctor_id, available_date, available_start_time, available_end_time });
    res.json(doctorAvailability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete doctor availability by ID
exports.deleteDoctorAvailabilityById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctorAvailability = await DoctorAvailability.findByPk(id);
    if (!doctorAvailability) {
      return res.status(404).json({ message: 'Doctor availability not found' });
    }
    await doctorAvailability.destroy();
    res.json({ message: 'Doctor availability deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
