"use strict";
const { ResidentCheckin } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await ResidentCheckin.sync();
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
