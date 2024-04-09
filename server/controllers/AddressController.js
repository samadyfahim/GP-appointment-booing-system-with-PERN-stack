const { Address } = require('../models');

// Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new address
exports.createAddress = async (req, res) => {
  const { street, city, state, postal_code, country } = req.body;
  try {
    const address = await Address.create({ street, city, state, postal_code, country });
    res.status(201).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update address by ID
exports.updateAddressById = async (req, res) => {
  const { id } = req.params;
  const { street, city, state, postal_code, country } = req.body;
  try {
    let address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    address = await address.update({ street, city, state, postal_code, country });
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete address by ID
exports.deleteAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    await address.destroy();
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
