"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class my_expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  my_expenses.init(
    {
      amount: { type: DataTypes.FLOAT, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "my_expenses",
    }
  );
  return my_expenses;
};
