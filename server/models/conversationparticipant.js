'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ConversationParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     ConversationParticipant.belongsTo(models.Conversation, {
       foreignKey: "conversation_id",
       as: "conversation",
     });
     ConversationParticipant.belongsTo(models.User, {
       foreignKey: "participant_id",
       as: "participant",
     });
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