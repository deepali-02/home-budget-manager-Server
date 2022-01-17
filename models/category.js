"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      logoUrl: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
