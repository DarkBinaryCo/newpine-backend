"use strict";
const { SecurityShift } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await SecurityShift.sync();
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
