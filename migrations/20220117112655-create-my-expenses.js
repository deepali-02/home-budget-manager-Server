"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("my_expenses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },
      // categoryId: {
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
    await queryInterface.dropTable("my_expenses");
  },
};
