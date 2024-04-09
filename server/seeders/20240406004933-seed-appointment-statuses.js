"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const appointmentStatusesData = [
      { status: "Scheduled", createdAt: new Date(), updatedAt: new Date() },
      { status: "Cancelled", createdAt: new Date(), updatedAt: new Date() },
      { status: "Completed", createdAt: new Date(), updatedAt: new Date() },
      // Add more statuses as needed
    ];

    return queryInterface.bulkInsert(
      "AppointmentStatuses",
      appointmentStatusesData,
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
    return queryInterface.bulkDelete("AppointmentStatuses", null, {});
  },
};
