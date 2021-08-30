"use strict";
const { Payment } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Payment.sync();
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
