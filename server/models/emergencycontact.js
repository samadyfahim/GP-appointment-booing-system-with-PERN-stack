"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmergencyContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here profile_id
      EmergencyContact.belongsTo(models.Profile, { foreignKey: "profile_id" });
    }
  }
  EmergencyContact.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      relationship: DataTypes.STRING,
      phone: DataTypes.STRING,
      profile_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmergencyContact",
    }
  );
  return EmergencyContact;
};
