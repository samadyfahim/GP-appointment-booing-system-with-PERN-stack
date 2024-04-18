'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: "conversation_id",
        as: "conversation",
      });
      Message.belongsTo(models.User, {
        foreignKey: "sender_id",
        as: "sender",
      });
    }
  }
  Message.init({
    conversation_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    message_text: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};