"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Profile } = require("../models");

    const profiles = await Profile.findAll();

    const emergencyContactData = profiles.map((profile) => ({
      profile_id: profile.id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      relationship: faker.random.word(),
      phone: faker.phone.phoneNumber(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert(
      "EmergencyContacts",
      emergencyContactData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("EmergencyContacts", null, {});
  },
};
