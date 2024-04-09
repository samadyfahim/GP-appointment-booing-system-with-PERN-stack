"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Profile, Address } = require("../models");

    // Fetch existing profiles and addresses
    const profiles = await Profile.findAll();
    const addresses = await Address.findAll();

    // Create contact information entries with associated address IDs
    const contactInformationData = profiles.map((profile, index) => ({
      profile_id: profile.id,
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address_id: addresses.id,
      // address_id: addresses[index % addresses.length].id, //address id in a round-robin fashion
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert(
      "ContactInformations",
      contactInformationData,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("ContactInformations", null, {});
  },
};
