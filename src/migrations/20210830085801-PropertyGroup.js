"use strict";
const { PropertyGroup } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await PropertyGroup.sync();
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
