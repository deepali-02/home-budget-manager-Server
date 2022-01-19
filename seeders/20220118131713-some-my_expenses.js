"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "my_expenses",
      [
        {
          amount: 20,
          date: "01/15/2022",
          userId: 1,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 18,
          date: "01/18/2022",
          userId: 1,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 40,
          date: "01/18/2022",
          userId: 1,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("my_expenses", null, {});
  },
};
