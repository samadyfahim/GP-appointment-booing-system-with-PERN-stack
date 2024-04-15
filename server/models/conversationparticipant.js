'use strict';
const { Model } = require("sequelize");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConversationParticipant.init({
    conversation_id: DataTypes.INTEGER,
    participant_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ConversationParticipant',
  });
  return ConversationParticipant;
};