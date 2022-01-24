"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Grocery",
          color: "#54e8a5",
          logoUrl:
            "https://cdn3.iconfinder.com/data/icons/unigrid-flat-food/90/006_142_grocery_food_gastronomy_bag-512.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clothing",
          color: "#e81a54",
          logoUrl:
            "https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-shirt-icon-png-image_4275708.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Housing",
          color: "#38cee8",
          logoUrl:
            "https://w7.pngwing.com/pngs/22/547/png-transparent-white-and-orange-icon-oregon-service-home-icon-miscellaneous-angle-building.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food & Drinks",
          color: "#ebeb17",
          logoUrl:
            "https://p7.hiclipart.com/preview/175/335/608/fast-food-drink-foodservice-beverage-industry-food-and-neverage-png.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electronics",
          color: "#5af2de",
          logoUrl:
            "https://icon-library.com/images/electronic-device-icon/electronic-device-icon-3.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Transportation",
          color: "#eb17eb",
          logoUrl:
            "https://www.wavetransit.com/wp-content/uploads/2017/03/wave-connect-bus-icon-300x300.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Other",
          color: "#6e4447",
          logoUrl: "https://icon-library.com/images/flat_hamburger-512.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
