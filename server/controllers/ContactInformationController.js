const { ContactInformation } = require('../models');

// Get all contact information
exports.getAllContactInformation = async (req, res) => {
  try {
    const contactInformation = await ContactInformation.findAll();
    res.json(contactInformation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get contact information by ID
exports.getContactInformationById = async (req, res) => {
  const { id } = req.params;
  try {
    const contactInformation = await ContactInformation.findByPk(id);
    if (!contactInformation) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    res.json(contactInformation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create new contact information
exports.createContactInformation = async (req, res) => {
  const { email, phone, profile_id, address_id } = req.body;
  try {
    const contactInformation = await ContactInformation.create({ email, phone, profile_id, address_id });
    res.status(201).json(contactInformation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update contact information by ID
exports.updateContactInformationById = async (req, res) => {
  const { id } = req.params;
  const { email, phone, profile_id, address_id } = req.body;
  try {
    let contactInformation = await ContactInformation.findByPk(id);
    if (!contactInformation) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    contactInformation = await contactInformation.update({ email, phone, profile_id, address_id });
    res.json(contactInformation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete contact information by ID
exports.deleteContactInformationById = async (req, res) => {
  const { id } = req.params;
  try {
    const contactInformation = await ContactInformation.findByPk(id);
    if (!contactInformation) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    await contactInformation.destroy();
    res.json({ message: 'Contact information deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
