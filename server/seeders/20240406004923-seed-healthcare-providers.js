'use strict';
const faker = require('faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('HealthcareProviders', [{
      provider_name: "myCare",
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('HealthcareProviders', null, {});
  }
};
