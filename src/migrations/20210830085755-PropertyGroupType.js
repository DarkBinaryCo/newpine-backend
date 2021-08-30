"use strict";
const { PropertyGroupType } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await PropertyGroupType.sync();
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
