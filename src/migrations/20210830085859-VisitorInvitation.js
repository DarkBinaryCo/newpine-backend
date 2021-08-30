"use strict";
const { VisitorInvitation } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await VisitorInvitation.sync();
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
