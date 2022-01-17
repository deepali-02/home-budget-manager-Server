'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goal_name: {
        type: Sequelize.STRING
      },
      target_amount: {
        type: Sequelize.FLOAT
      },
      saved_amount: {
        type: Sequelize.FLOAT
      },
      desire_date: {
        type: Sequelize.DATE
      },
      color: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('goals');
  }
};