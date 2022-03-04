'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      message.belongsTo(models.user, {
        as: "usersend",
        foreignKey: {
          name: "userSend",
        },
      });
      message.belongsTo(models.user, {
        as: "userid",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  message.init({
    userId: DataTypes.INTEGER,
    userSend: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};