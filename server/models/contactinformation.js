'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContactInformation.belongsTo(models.Profile, { foreignKey: 'profile_id' });
      ContactInformation.belongsTo(models.Address, { foreignKey: 'address_id' });
    }
  }
  ContactInformation.init({
    email: DataTypes.STRING,
    phone: DataTypes.STRING
    //profile_id: DataTypes.INTEGER,
    //address_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ContactInformation',
  });
  return ContactInformation;
};