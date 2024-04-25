"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.belongsTo(models.User, { foreignKey: "user_id" });
      Patient.hasMany(models.Appointment, { foreignKey: "patient_id" });
      Patient.hasMany(models.Prescription, { foreignKey: "patient_id" });
      Patient.hasMany(models.AppointmentRequest, { foreignKey: "patient_id" });
    }
  }
  Patient.init(
    {},
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
