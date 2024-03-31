const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const User = sequelize.define('User', {
   userName: {
    type: DataTypes.STRING,
    allowNull: false
  },email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hash_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
module.exports = User;