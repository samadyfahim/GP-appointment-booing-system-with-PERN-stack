const { HealthcareProvider } = require('../models');

// Get all healthcare providers
exports.getAllHealthcareProviders = async (req, res) => {
  try {
    const healthcareProviders = await HealthcareProvider.findAll();
    res.json(healthcareProviders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get healthcare provider by ID
exports.getHealthcareProviderById = async (req, res) => {
  const { id } = req.params;
  try {
    const healthcareProvider = await HealthcareProvider.findByPk(id);
    if (!healthcareProvider) {
      return res.status(404).json({ message: 'Healthcare provider not found' });
    }
    res.json(healthcareProvider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new healthcare provider
exports.createHealthcareProvider = async (req, res) => {
  const { provider_name, address, phone, email } = req.body;
  try {
    const healthcareProvider = await HealthcareProvider.create({ provider_name, address, phone, email });
    res.status(201).json(healthcareProvider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update healthcare provider by ID
exports.updateHealthcareProviderById = async (req, res) => {
  const { id } = req.params;
  const { provider_name, address, phone, email } = req.body;
  try {
    let healthcareProvider = await HealthcareProvider.findByPk(id);
    if (!healthcareProvider) {
      return res.status(404).json({ message: 'Healthcare provider not found' });
    }
    healthcareProvider = await healthcareProvider.update({ provider_name, address, phone, email });
    res.json(healthcareProvider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete healthcare provider by ID
exports.deleteHealthcareProviderById = async (req, res) => {
  const { id } = req.params;
  try {
    const healthcareProvider = await HealthcareProvider.findByPk(id);
    if (!healthcareProvider) {
      return res.status(404).json({ message: 'Healthcare provider not found' });
    }
    await healthcareProvider.destroy();
    res.json({ message: 'Healthcare provider deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
