"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("goals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      goal_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      saved_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      desire_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
      },
      logoUrl: {
        type: Sequelize.TEXT,
      },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("goals");
  },
};
