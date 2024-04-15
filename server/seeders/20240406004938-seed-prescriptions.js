"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Patient, Doctor } = require("../models");

    // Fetch all existing patients and doctors
    const patients = await Patient.findAll();
    const doctors = await Doctor.findAll();

    // Generate fake prescriptions
    const prescriptionsData = patients.map((patient) => ({
      patient_id: patient.id,
      doctor_id: faker.random.arrayElement(doctors).id,
      prescription_date: faker.date.past(),
      medication_name: faker.lorem.words(),
      dosage: faker.datatype.number({ min: 1, max: 10 }),
      frequency: faker.random.arrayElement([
        "Once daily",
        "Twice daily",
        "As needed",
      ]),
      duration: faker.random.arrayElement(["7 days", "14 days", "30 days"]),
      notes: faker.lorem.paragraph().substring(0, 255),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Prescriptions", prescriptionsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Prescriptions", null, {});
  },
};
