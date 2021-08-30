"use strict";
// Helpers
const setDefaultDates = require("./helpers/setDefaultDates");

const courtList = require("../../data/courts");
const mZoneList = require("../../data/mansionetteZones");

//
const TABLE_NAME = "property_groups";

//? This information is coming from `data/propertyGroups.js`
const COURT_GROUP_TYPE_ID = 1;
const MANSIONETTE_GROUP_TYPE_ID = 2;

/** Get property groups to be inserted into the datbase
 * @return {Array} A list of property groups
 */
let getPropertyGroups = () => {
  let mansionetteDbData = mZoneList.map((mZone) => {
    return {
      name: mZone.name, //? No prefix|suffix support needed
      propertyCount: mZone.houses,
      phase: mZone.phase,
      propertyGroupTypeId: MANSIONETTE_GROUP_TYPE_ID,
    };
  });

  let courtDbData = courtList.map((court) => {
    let prefix = court.prefix || "";
    let suffix = court.suffix || "";
    let courtName = prefix + court.name + suffix;

    return {
      name: courtName,
      propertyCount: court.houses,
      phase: court.phase,
      propertyGroupTypeId: COURT_GROUP_TYPE_ID,
    };
  });

  //
  let propertyGroupData = mansionetteDbData.concat(courtDbData);
  return propertyGroupData;
};

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear the table before trying to insert data
    await queryInterface.bulkDelete(TABLE_NAME);

    let insertData = getPropertyGroups();
    queryInterface.bulkInsert(
      TABLE_NAME,
      setDefaultDates(insertData, Sequelize)
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
