"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Grocery",
          color: "#0099ff",
          logoUrl:
            "https://e7.pngegg.com/pngimages/889/750/png-clipart-winnipeg-transit-logo-service-transport-shopping-cart-blue-text.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clothing",
          color: "#ff0000",
          logoUrl:
            "https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-shirt-icon-png-image_4275708.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Housing",
          color: "#ff6600",
          logoUrl:
            "https://w7.pngwing.com/pngs/22/547/png-transparent-white-and-orange-icon-oregon-service-home-icon-miscellaneous-angle-building.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food & Drinks",
          color: "#33cc33",
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
          color: "#000080",
          logoUrl:
            "https://www.wavetransit.com/wp-content/uploads/2017/03/wave-connect-bus-icon-300x300.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Other",
          color: "#969696",
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
