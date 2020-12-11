"use strict";

const TABLE_NAME = "security_shifts";

const DEFAULT_SECURITY_SHIFTS = [
  { id: 1, name: "morning", startTime: "06:00", endTime: "18:00" },
  { id: 2, name: "night", startTime: "18:00", endTime: "06:00" },
];

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
    queryInterface.bulkInsert(TABLE_NAME, DEFAULT_SECURITY_SHIFTS);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
