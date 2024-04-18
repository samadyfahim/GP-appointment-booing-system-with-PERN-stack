'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conversation.hasMany(models.Message, {
        foreignKey: "conversation_id",
        as: "messages",
      });
      Conversation.belongsToMany(models.User, {
        through: "ConversationParticipant",
        as: "participants",
        foreignKey: "conversation_id",
      });
    }
  }
  Conversation.init({
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};