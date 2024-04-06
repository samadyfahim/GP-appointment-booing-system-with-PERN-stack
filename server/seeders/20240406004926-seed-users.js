'use strict';
const faker = require('faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const { HealthcareProvider, UserType } = require('../models'); // Import HealthcareProvider and UserType models

    // Fetch all existing healthcare providers and user types
    const healthcareProviders = await HealthcareProvider.findAll();
    const userTypes = await UserType.findAll();

    // Generate fake users
    const usersData = Array.from({ length: 10 }).map(() => ({
      username: faker.internet.userName(),
      password: "$2a$10$Fp6Xullim3IlDvcll1FWgeWumwsJFLFmsBWKgnCw8aaT1uzap3cEC",
      email: faker.internet.email(),
      provider_id: faker.random.arrayElement(healthcareProviders).id,
      user_type_id: faker.random.arrayElement(userTypes).id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Users', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
