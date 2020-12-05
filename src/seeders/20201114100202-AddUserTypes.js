"use strict";
//
const TABLE_NAME = "user_types";

// Default user types
const DEFAULT_USER_TYPES = [
  {
    id: 1,
    name: "admin",
    description: "Administrator - ideally Dark Binary.",
  },
  {
    id: 2,
    name: "sales",
    description:
      "Sales account - used for sending out messages to users of the system",
  },
  {
    id: 3,
    name: "security_manager",
    description:
      "Security management representative - can checkin security and add guards",
  },
  {
    id: 4,
    name: "security_guard",
    description: "Security guard",
  },
  {
    id: 5,
    name: "resident_rep",
    description:
      "Resident representative - can activate resident accounts as well as resident vehicles",
  },
  {
    id: 6,
    name: "resident",
    description: "Resident. Includes co-residents",
  },
];

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear the table before trying to insert data
    await queryInterface.bulkDelete(TABLE_NAME);

    queryInterface.bulkInsert(TABLE_NAME, DEFAULT_USER_TYPES);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
