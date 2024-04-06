'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppointmentRequest.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      AppointmentRequest.belongsTo(models.AppointmentStatus, { foreignKey: 'status_id' });
    }
  }
  AppointmentRequest.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    prefer_time: {
      type: DataTypes.ENUM('Morning', 'Noon', 'Afternoon', 'Any'),
      allowNull: false,
      defaultValue: 'Any'
    },
    description: DataTypes.TEXT,
    severity: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium'
    },
  }, {
    sequelize,
    modelName: 'AppointmentRequest',
  });
  return AppointmentRequest;
};