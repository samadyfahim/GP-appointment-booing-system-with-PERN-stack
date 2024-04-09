"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const { User } = require("../models"); // Import User model

    // Fetch all existing users
    const users = await User.findAll();

    // Generate fake admins
    const adminsData = users.map((user) => ({
      user_id: user.id,
      admin_rank: faker.random.arrayElement(["Junior", "Senior", "Manager"]),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Admins", adminsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Admins", null, {});
  },
};
