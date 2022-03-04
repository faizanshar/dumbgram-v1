"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.message, {
        as: "messages",
        foreignKey: {
          name: "id",
        },
      });
      // user.hasMany(models.message, {
      //   as: "userSend",
      //   foreignKey: {
      //     name: "userSend",
      //   },
      // });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      fullName: DataTypes.STRING,
      image: DataTypes.STRING,
      bio: DataTypes.STRING,
      chatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
