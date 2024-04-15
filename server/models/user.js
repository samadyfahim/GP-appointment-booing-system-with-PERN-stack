"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, { foreignKey: "user_id" });
      User.belongsTo(models.UserType, { foreignKey: "user_type_id" });
      User.belongsTo(models.HealthcareProvider, { foreignKey: "provider_id" });

      User.hasOne(models.Patient, { foreignKey: "user_id" });
      User.hasOne(models.Doctor, { foreignKey: "user_id" });
      User.hasOne(models.Admin, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
