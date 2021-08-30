"use strict";
const { Property } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Property.sync();
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
