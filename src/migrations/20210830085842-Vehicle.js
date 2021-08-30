"use strict";
const { Vehicle } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Vehicle.sync();
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
