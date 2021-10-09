"use strict";

const { DEFAULT_COMMUNITY_ID, DEFAULT_HOST } = require("./config");

// Helpers
const setDefaultDates = require("./helpers/setDefaultDates");
const setUUIDIds = require("./helpers/setUUIDIds");

const TABLE_NAME = "communities";

const BASE_COMMUNITIES = [
  {
    id: DEFAULT_COMMUNITY_ID,
    name: "Nyayo Estate",
    host: DEFAULT_HOST,
    type: "residential",
    propertyCount: 4774,
    description:
      "The largest and cleanest estate in East Africa built by NSSF in the 90s",
    location: "Nyayo Estate Embakasi, Nairobi",
    latitude: -1.3365,
    longitude: 36.9244,
    isActive: true,
  },
];

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);

    queryInterface.bulkInsert(
      TABLE_NAME,
      setDefaultDates(setUUIDIds(BASE_COMMUNITIES), Sequelize)
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
