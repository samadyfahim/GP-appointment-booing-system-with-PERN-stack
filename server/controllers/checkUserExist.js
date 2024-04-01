const User = require('../models/user');

exports.checkUserExistence = async (email) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        return !!existingUser; // Convert to boolean
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw new Error('Internal server error');
    }
};
