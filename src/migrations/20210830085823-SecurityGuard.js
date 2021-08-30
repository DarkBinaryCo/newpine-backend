"use strict";
const { SecurityGuard } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await SecurityGuard.sync();
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
