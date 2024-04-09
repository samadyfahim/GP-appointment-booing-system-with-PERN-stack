"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { User } = require("../models"); // Import User model

    // Fetch all existing users
    const users = await User.findAll();

    // Generate fake profiles
    const profilesData = users.map((user) => ({
      user_id: user.id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      date_of_birth: faker.date.past(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Profiles", profilesData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Profiles", null, {});
  },
};
