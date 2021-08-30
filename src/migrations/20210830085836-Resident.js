"use strict";
const { Resident } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Resident.sync();
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
