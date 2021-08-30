"use strict";
// Helpers
const setDefaultDates = require("./helpers/setDefaultDates");

const propertyGroupTypes = require("../../data/propertyGroupTypes");

//
const TABLE_NAME = "property_group_types";

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear the table before trying to insert data
    queryInterface.bulkDelete(TABLE_NAME);

    let insertData = propertyGroupTypes;
    queryInterface.bulkInsert(
      TABLE_NAME,
      setDefaultDates(insertData, Sequelize)
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
