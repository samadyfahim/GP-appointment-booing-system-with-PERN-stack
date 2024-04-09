const { Admin } = require('../models');

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new admin
exports.createAdmin = async (req, res) => {
  const { user_id, admin_rank } = req.body;
  try {
    const admin = await Admin.create({ user_id, admin_rank });
    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update admin by ID
exports.updateAdminById = async (req, res) => {
  const { id } = req.params;
  const { user_id, admin_rank } = req.body;
  try {
    let admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    admin = await admin.update({ user_id, admin_rank });
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete admin by ID
exports.deleteAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    await admin.destroy();
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
