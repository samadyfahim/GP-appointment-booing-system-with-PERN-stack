const express = require('express');
const router = express.Router();
const pool = require('../config/dbConn');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json({ users: users.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async(req, res) => {
        const { username, email, hashedPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
