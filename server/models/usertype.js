"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserType.hasMany(models.User, { foreignKey: "user_type_id" });
    }
  }
  UserType.init(
    {
      user_type_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserType",
    }
  );
  return UserType;
};
