"use strict";
const { Community } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Community.sync();
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
