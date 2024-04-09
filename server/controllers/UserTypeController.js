const { UserType } = require('../models');

// Get all user types
exports.getAllUserTypes = async (req, res) => {
  try {
    const userTypes = await UserType.findAll();
    res.json(userTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user type by ID
exports.getUserTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const userType = await UserType.findByPk(id);
    if (!userType) {
      return res.status(404).json({ message: 'User type not found' });
    }
    res.json(userType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new user type
exports.createUserType = async (req, res) => {
  const { user_type_name } = req.body;
  try {
    const userType = await UserType.create({ user_type_name });
    res.status(201).json(userType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user type by ID
exports.updateUserTypeById = async (req, res) => {
  const { id } = req.params;
  const { user_type_name } = req.body;
  try {
    let userType = await UserType.findByPk(id);
    if (!userType) {
      return res.status(404).json({ message: 'User type not found' });
    }
    userType = await userType.update({ user_type_name });
    res.json(userType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete user type by ID
exports.deleteUserTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const userType = await UserType.findByPk(id);
    if (!userType) {
      return res.status(404).json({ message: 'User type not found' });
    }
    await userType.destroy();
    res.json({ message: 'User type deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
