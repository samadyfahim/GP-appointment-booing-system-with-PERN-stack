// userController.js
const bcrypt = require('bcryptjs');
const  User  = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Generate a salt and hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using the User model with the hashed password
        const user = await User.create({ userName, email, hash_password: hashedPassword });

        // Respond with the created user object
        res.status(201).json(user);
    } catch (error) {
        // Handle any errors that occur during user creation
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
