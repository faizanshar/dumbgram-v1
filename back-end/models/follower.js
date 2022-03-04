"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      follower.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      follower.belongsTo(models.user, {
        as: "follow",
        foreignKey: {
          name: "userFollow",
        },
      });
    }
  }
  follower.init(
    {
      userFollow: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "follower",
    }
  );
  return follower;
};
