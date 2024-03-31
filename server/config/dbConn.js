const { Pool } = require('pg');
require('dotenv').config();


const requiredEnvVariables = ['DB_USER', 'DB_HOST', 'DB_DATABASE', 'DB_PASSWORD', 'DB_PORT'];
for (const envVar of requiredEnvVariables) {
    if (!process.env[envVar]) {
        console.error(`Error: ${envVar} is not defined in the environment`);
        process.exit(1);
    }
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Database connection failed', err);
});

module.exports = pool;