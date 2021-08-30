"use strict";
// Helpers
const setDefaultDates = require("./helpers/setDefaultDates");

//
const TABLE_NAME = "user_types";

// Default user types
const DEFAULT_USER_TYPES = [
  {
    id: 1,
    name: "admin",
    friendlyName: "Administrator",
    description: "Administrator - ideally Dark Binary.",
    isAdminEditable: true,
  },
  {
    id: 2,
    name: "sales",
    friendlyName: "Sales",
    description:
      "Sales account - used for sending out messages to users of the system",
    isAdminEditable: true,
  },
  {
    id: 3,
    name: "security_manager",
    friendlyName: "Security manager",
    description:
      "Security management representative - can checkin security and add guards",
    isAdminEditable: true,
  },
  {
    id: 4,
    name: "security_guard",
    friendlyName: "Security guard",
    description:
      "Security guard. Can checkin/checkout residents, visitors and stuff",
    isAdminEditable: true,
  },
  {
    id: 5,
    name: "resident_rep",
    friendlyName: "Resident representative",
    description:
      "Resident representative - can activate resident accounts as well as resident vehicles",
    isAdminEditable: true,
  },
  {
    id: 6,
    name: "resident",
    friendlyName: "Resident",
    description: "Resident. Includes co-residents",
    isAdminEditable: false,
  },
];

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear the table before trying to insert data
    await queryInterface.bulkDelete(TABLE_NAME);

    queryInterface.bulkInsert(
      TABLE_NAME,
      setDefaultDates(DEFAULT_USER_TYPES, Sequelize)
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
