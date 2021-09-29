"use strict";
const uuid = require("uuid");

// Config
const { USER_TYPE } = require("../config/auth");

// Helpers
const setDefaultCommunity = require("./helpers/setDefaultCommunity");
const setDefaultDates = require("./helpers/setDefaultDates");

// Add the first admins user accounts that can be used to manage everything else
const TABLE_NAME = "users";

//
const DEFAULT_ADMIN_USERS = [
  {
    id: uuid.v4(),
    firstName: "Allan",
    lastName: "Jeremy",
    phone: "+254771270270",
    bio: "Genesis",
    email: "dev@allanjeremy.com",
    userTypeId: USER_TYPE.ADMIN,
    identificationTypeId: 1,
    isVerified: true,
  },
];

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // queryInterface.bulkDelete(TABLE_NAME);
    let insertion = await queryInterface.bulkInsert(
      TABLE_NAME,
      setDefaultCommunity(setDefaultDates(DEFAULT_ADMIN_USERS, Sequelize))
    );

    console.log(insertion);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
