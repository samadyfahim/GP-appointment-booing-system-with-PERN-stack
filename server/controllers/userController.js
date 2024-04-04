const bcrypt = require('bcryptjs');
const User = require('../models/user');
const pool = require('../config/dbConn');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../utils/jwtToken');
const authenticateToken = require('../middleware/authorisationToken')

exports.createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const userExists = await findUserByEmail(email);
        if (userExists) {
            throw new Error('User with this email is already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userName, email, hash_password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);
        const tokens = generateTokens(user);
        setRefreshTokenCookie(res, tokens.refreshToken);
        res.status(200).json({ ok: true, ...tokens });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await authenticateUser(email, oldPassword);
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.hash_password = hashedNewPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = [authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
}];

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('User does not exist');
    }
    const passwordMatch = await comparePassword(password, user.hash_password);
    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }
    return user;
};

const generateTokens = (user) => {
    const { id, userName, email } = user;
    return jwtTokens({ userId: id, userName, email });
};

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
};

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};