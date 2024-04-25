"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prescription.belongsTo(models.Patient, { foreignKey: "patient_id" });
      Prescription.belongsTo(models.Doctor, { foreignKey: "doctor_id" });
    }
  }
  Prescription.init(
    {
      prescription_date: DataTypes.DATE,
      medication_name: DataTypes.STRING,
      dosage: DataTypes.STRING,
      frequency: DataTypes.STRING,
      duration: DataTypes.STRING,
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  return Prescription;
};
