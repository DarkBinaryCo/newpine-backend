"use strict";
const { VisitorCheckin } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await VisitorCheckin.sync();
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
