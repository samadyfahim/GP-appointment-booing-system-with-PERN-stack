'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Patients', [
      {
        userId: 1, 
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        emergencyContact: 'Jane Doe',
        dateOfRegistration: new Date(),
        address: '123 Main St',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Patients', null, {});
  }
};
