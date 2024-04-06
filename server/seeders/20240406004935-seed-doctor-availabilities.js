'use strict';
const faker = require('faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Doctor } = require('../models'); // Import Doctor model

    // Fetch all existing doctors
    const doctors = await Doctor.findAll();

    // Generate fake doctor availabilities
    const availabilitiesData = doctors.map(doctor => ({
      doctor_id: doctor.id,
      available_date: faker.date.future(),
      available_start_time: generateTime(),
      available_end_time: generateTime(),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('DoctorAvailabilities', availabilitiesData, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DoctorAvailabilities', null, {});
  }
};
function generateTime() {
  const hour = faker.datatype.number({ min: 0, max: 23 });
  const minute = faker.datatype.number({ min: 0, max: 59 });
  const second = faker.datatype.number({ min: 0, max: 59 });
  return `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
}

// Function to pad single-digit numbers with zero
function padZero(num) {
  return num.toString().padStart(2, '0');
}