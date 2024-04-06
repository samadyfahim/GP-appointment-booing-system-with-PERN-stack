'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorAvailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoctorAvailability.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });


    }
  }
  DoctorAvailability.init({
    available_date: DataTypes.DATE,
    available_start_time: DataTypes.TIME,
    available_end_time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'DoctorAvailability',
  });
  return DoctorAvailability;
};