const { EmergencyContact } = require('../models');

// Get all emergency contacts
exports.getAllEmergencyContacts = async (req, res) => {
  try {
    const emergencyContacts = await EmergencyContact.findAll();
    res.json(emergencyContacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get emergency contact by ID
exports.getEmergencyContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const emergencyContact = await EmergencyContact.findByPk(id);
    if (!emergencyContact) {
      return res.status(404).json({ message: 'Emergency contact not found' });
    }
    res.json(emergencyContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create new emergency contact
exports.createEmergencyContact = async (req, res) => {
  const { profile_id, first_name, last_name, relationship, phone } = req.body;
  try {
    const emergencyContact = await EmergencyContact.create({ profile_id, first_name, last_name, relationship, phone });
    res.status(201).json(emergencyContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update emergency contact by ID
exports.updateEmergencyContactById = async (req, res) => {
  const { id } = req.params;
  const { profile_id, first_name, last_name, relationship, phone } = req.body;
  try {
    let emergencyContact = await EmergencyContact.findByPk(id);
    if (!emergencyContact) {
      return res.status(404).json({ message: 'Emergency contact not found' });
    }
    emergencyContact = await emergencyContact.update({ profile_id, first_name, last_name, relationship, phone });
    res.json(emergencyContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete emergency contact by ID
exports.deleteEmergencyContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const emergencyContact = await EmergencyContact.findByPk(id);
    if (!emergencyContact) {
      return res.status(404).json({ message: 'Emergency contact not found' });
    }
    await emergencyContact.destroy();
    res.json({ message: 'Emergency contact deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
