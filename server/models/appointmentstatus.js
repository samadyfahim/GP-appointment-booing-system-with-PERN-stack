'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppointmentStatus.hasMany(models.Appointment, { foreignKey: 'status_id' });
      AppointmentStatus.hasMany(models.AppointmentRequest, { foreignKey: 'status_id' });

    }
  }
  AppointmentStatus.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppointmentStatus',
  });
  return AppointmentStatus;
};