"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "goals",
      [
        {
          goal_name: "Holiday trip",
          target_amount: 3000.0,
          desire_date: "2022-07-01",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("goals", null, {});
  },
};
