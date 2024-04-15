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

    // Generate fake patients only for the first half of users
    const patientsData = users.slice(0, halfIndex).map((user) => ({
      user_id: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Bulk insert for the first half users as patients
    return queryInterface.bulkInsert("Patients", patientsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Patients", null, {});
  },
};
