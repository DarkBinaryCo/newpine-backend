"use strict";
// Helpers
const setDefaultDates = require("./helpers/setDefaultDates");

//
const TABLE_NAME = "identification_types";

const DEFAULT_IDENTIFICATION_TYPES = [
  {
    id: 1,
    name: "National ID",
    description: "Kenyan National ID in the case of Kenyan Newpine",
  },
  { id: 2, name: "Foreign ID", description: "An Alien ID" },
  { id: 3, name: "Passport" },
  { id: 4, name: "Military ID" },
];

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);

    queryInterface.bulkInsert(
      TABLE_NAME,
      setDefaultDates(DEFAULT_IDENTIFICATION_TYPES, Sequelize)
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
