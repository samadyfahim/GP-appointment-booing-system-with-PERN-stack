const { Profile } = require('../models');

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get profile by ID
exports.getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new profile
exports.createProfile = async (req, res) => {
  const { user_id, first_name, last_name, date_of_birth } = req.body;
  try {
    const profile = await Profile.create({ user_id, first_name, last_name, date_of_birth });
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update profile by ID
exports.updateProfileById = async (req, res) => {
  const { id } = req.params;
  const { user_id, first_name, last_name, date_of_birth } = req.body;
  try {
    let profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    profile = await profile.update({ user_id, first_name, last_name, date_of_birth });
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete profile by ID
exports.deleteProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    await profile.destroy();
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
