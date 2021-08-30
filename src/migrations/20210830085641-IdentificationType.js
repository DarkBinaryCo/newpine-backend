"use strict";
const { IdentificationType } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await IdentificationType.sync();
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
