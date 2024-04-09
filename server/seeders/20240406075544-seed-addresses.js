"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const addressData = Array.from({ length: 10 }).map(() => ({
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postal_code: faker.address.zipCode(),
      country: faker.address.country(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Addresses", addressData, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Addresses", null, {});
  },
};
