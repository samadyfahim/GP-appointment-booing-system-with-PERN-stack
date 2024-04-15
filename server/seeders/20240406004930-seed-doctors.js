"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { User } = require("../models");

    // Fetch all existing users
    const users = await User.findAll();

    // Calculate the half point of the users array
    const halfIndex = Math.ceil(users.length / 2);

    // Generate fake doctors only for the second half of users
    const doctorsData = users.slice(halfIndex).map((user) => ({
      user_id: user.id,
      specialization: faker.lorem.words(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Bulk insert for the second half users as doctors
    return queryInterface.bulkInsert("Doctors", doctorsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Doctors", null, {});
  },
};
