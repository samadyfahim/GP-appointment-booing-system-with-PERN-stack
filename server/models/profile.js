"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "user_id" });
      Profile.hasOne(models.ContactInformation, { foreignKey: "profile_id" });
      Profile.hasOne(models.EmergencyContact, { foreignKey: "profile_id" });
    }
  }
  Profile.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
