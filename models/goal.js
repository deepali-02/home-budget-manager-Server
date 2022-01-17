"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  goal.init(
    {
      goal_name: { type: DataTypes.STRING, allowNull: false },
      target_amount: { type: DataTypes.FLOAT, allowNull: false },
      saved_amount: { type: DataTypes.FLOAT, allowNull: false },
      desire_date: { type: DataTypes.DATE, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      logo: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "goal",
    }
  );
  return goal;
};
