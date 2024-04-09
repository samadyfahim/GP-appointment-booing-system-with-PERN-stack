const { Prescription } = require('../models');

// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll();
    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get prescription by ID
exports.getPrescriptionsForPatient = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const prescriptions = await Prescription.findAll({
      where: { patient_id }
    });
    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new prescription
exports.createPrescription = async (req, res) => {
  const { patient_id, doctor_id, prescription_date, medication_name, dosage, frequency, duration, notes } = req.body;
  try {
    const prescription = await Prescription.create({ patient_id, doctor_id, prescription_date, medication_name, dosage, frequency, duration, notes });
    res.status(201).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update prescription by ID
exports.updatePrescriptionById = async (req, res) => {
  const { id } = req.params;
  const { patient_id, doctor_id, prescription_date, medication_name, dosage, frequency, duration, notes } = req.body;
  try {
    let prescription = await Prescription.findByPk(id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    prescription = await prescription.update({ patient_id, doctor_id, prescription_date, medication_name, dosage, frequency, duration, notes });
    res.json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete prescription by ID
exports.deletePrescriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findByPk(id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    await prescription.destroy();
    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
