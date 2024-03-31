const Patient = require('../models/Patient');

// Example method to create a patient
async function createPatient(req, res) {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createPatient
};
