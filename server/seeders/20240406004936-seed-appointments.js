"use strict";
const faker = require("faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Patient, Doctor, AppointmentStatus } = require("../models");

    // Fetch all existing patients, doctors, providers, and appointment statuses
    const patients = await Patient.findAll();
    const doctors = await Doctor.findAll();
    const appointmentStatuses = await AppointmentStatus.findAll();

    // Generate fake appointments
    const appointmentsData = patients.map((patient) => ({
      patient_id: patient.id,
      doctor_id: faker.random.arrayElement(doctors).id,
      appointment_datetime: faker.date.future(),
      status_id: faker.random.arrayElement(appointmentStatuses).id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Appointments", appointmentsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Appointments", null, {});
  },
};
