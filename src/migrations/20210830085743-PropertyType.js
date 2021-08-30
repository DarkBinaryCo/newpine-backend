"use strict";
const { PropertyType } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await PropertyType.sync();
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
