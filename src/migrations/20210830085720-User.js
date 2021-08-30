"use strict";
const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.sync();
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
