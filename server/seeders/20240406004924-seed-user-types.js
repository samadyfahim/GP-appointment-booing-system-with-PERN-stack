"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "UserTypes",
      [
        {
          user_type_name: "patient",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_type_name: "doctor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_type_name: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more user types as needed
      ],
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
    return queryInterface.bulkDelete("UserTypes", null, {});
  },
};
