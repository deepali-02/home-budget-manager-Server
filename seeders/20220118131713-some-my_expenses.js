"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "my_expenses",
      [
        {
          amount: 20,
          date: "2022-01-10",
          userId: 1,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 18,
          date: "2022-01-15",
          userId: 1,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 40,
          date: "2022-02-01",
          userId: 1,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 28,
          date: "2022-02-02",
          userId: 1,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 18,
          date: "2022-02-01",
          userId: 1,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 40,
          date: "2022-01-10",
          userId: 1,
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 16,
          date: "2022-01-10",
          userId: 1,
          categoryId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 67,
          date: "2022-01-10",
          userId: 1,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          amount: 43,
          date: "2022-01-10",
          userId: 1,
          categoryId: 1,
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
