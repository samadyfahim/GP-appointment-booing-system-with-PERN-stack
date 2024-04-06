'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
            
      Address.hasOne(models.ContactInformation, { foreignKey: 'address_id' });

      
    }
  }
  Address.init({
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};