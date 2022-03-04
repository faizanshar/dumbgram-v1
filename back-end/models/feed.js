'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      feed.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  feed.init({
    image: DataTypes.STRING,
    caption: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feed',
  });
  return feed;
};