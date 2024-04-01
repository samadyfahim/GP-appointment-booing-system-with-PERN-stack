const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const express = require('express');
const pool = require('../config/dbConn');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../utils/jwtToken');
const authenticateToken = require('../middleware/authorisationToken')
const { body, validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if the email already exists
        const userExists = await checkUserExistence(req.body.email);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, email, hash_password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.loginUser = [
    // Validate email and password
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.hash_password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Password is wrong' });
            }

            const tokens = jwtTokens({ userId: user.id, userName: user.userName, email: user.email });
            // res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true })

            // Respond with token and redirect URL
            res.status(200).json({ tokens, redirectUrl: '/home' });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
];


exports.updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.hash_password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.hash_password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUsers = [authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}];

