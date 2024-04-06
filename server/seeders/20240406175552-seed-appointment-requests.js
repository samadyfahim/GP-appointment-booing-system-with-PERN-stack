'use strict';
const faker = require('faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { Patient, AppointmentStatus } = require('../models');
    const patients = await Patient.findAll();
    const appointmentStatuses = await AppointmentStatus.findAll();
    const appointmentRequestsData = patients.map(patient => ({
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        date_of_birth: faker.date.past(),
        phone_number: faker.phone.phoneNumber(),
        prefer_time: faker.random.arrayElement(['Morning', 'Noon', 'Afternoon', 'Any']),
        description: faker.lorem.paragraph(),
        severity: faker.random.arrayElement(['low', 'medium', 'high']),
        patient_id: patient.id,
        status_id: faker.random.arrayElement(appointmentStatuses).id,
        createdAt: new Date(),
        updatedAt: new Date()
      }));


    // Insert appointment requests into the database
    return queryInterface.bulkInsert('AppointmentRequests', appointmentRequestsData, {});  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('AppointmentRequests', null, {});  }
};
