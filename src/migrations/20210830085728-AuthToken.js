"use strict";
const { AuthToken } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await AuthToken.sync();
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
