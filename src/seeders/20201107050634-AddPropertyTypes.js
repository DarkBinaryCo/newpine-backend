"use strict";
const propertyTypes = require("../../data/propertyTypes");

//
const TABLE_NAME = "property_types";

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear the table before trying to insert data
    await queryInterface.bulkDelete(TABLE_NAME);

    let insertData = propertyTypes;
    queryInterface.bulkInsert(TABLE_NAME, insertData);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
