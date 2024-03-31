const { Sequelize } = require('sequelize');
const config = require('./config.json');

// Determine the current environment
const environment = process.env.NODE_ENV || 'development';

// Load the database configuration for the current environment
const dbConfig = config[environment];

// Create a new Sequelize instance with the loaded database configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,

});

module.exports = sequelize;
