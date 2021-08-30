"use strict";
const { UserType } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await UserType.sync();
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
