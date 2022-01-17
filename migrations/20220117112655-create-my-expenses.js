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
        type: Sequelize.DATE,
        allowNull: false,
      },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },
      // categoriesId: {
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
