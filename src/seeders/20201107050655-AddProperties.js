"use strict";
// Helpers
const setDefaultDates = require("./helpers/setDefaultDates");

const courtList = require("../../data/courts");
const mZoneList = require("../../data/mansionetteZones");

// We will be using this to get property groups that will then be used to populate the properties
const { PropertyGroup } = require("../models"); //? Each property must belong to a property group

//
const TABLE_NAME = "properties";

//? This information is coming from `data/propertyGroups.js`
const COURT_GROUP_TYPE_ID = 1;
const MANSIONETTE_GROUP_TYPE_ID = 2;

//? This information is coming from `data/propertyTypes.js`
const APARTMENT_PROPERTY_TYPE_ID = 1;
const MANSIONETTE_PROPERTY_TYPE_ID = 2;

//? Fetching once here to prevent multiple requests when generating mansionette numbers
const courtNumbers = courtList.map((court) => court.name);

/** [Abstraction] Get an array of properties belonging to a group within a given house number range
 * Assumes that the properties follow a sequential numbering system ie. (1,2,3,4 etc.)
 * Assumes all properties generated in this function are of the same type.
 * To generate different property types, the function will have to be called multiple times with different parameters
 * @param {Number} firstNumber The first house number
 * @param {Number} lastNumber The last house number
 * @param {Number} propertyGroupId The id of the court these properties belong to
 * @param {Object} options
 * @return {Array} An array of properties in sequential order generated using the attributes passed into the function
 */
let __getCourtHouses = (
  firstNumber,
  lastNumber,
  propertyGroupId,
  options = { prefix: "", suffix: "" }
) => {
  let propertyTypeId = APARTMENT_PROPERTY_TYPE_ID;

  let properties = [];

  // Generate all properties in the given range
  for (let num = firstNumber; num <= lastNumber; num++) {
    let propertyNumPrefix = options.prefix || "";
    let propertyNumSuffix = options.suffix || "";

    let propertyNumber = propertyNumPrefix + num + propertyNumSuffix;

    properties.push({
      propertyNumber,
      propertyTypeId,
      propertyGroupId,
    });
  }

  return properties;
};

/** [Abstraction] Get an array of mansionette properties within a given house number range
 * Assumes that the properties follow a sequential numbering system ie. (1,2,3,4 etc.)
 * Assumes all properties generated in this function are of the same type.
 * To generate different property types, the function will have to be called multiple times with different parameters
 * @param {Number} firstNumber The first house number
 * @param {Number} lastNumber The last house number
 * @param {Number} propertyGroupId The id of the court these properties belong to
 * @param {Object} options
 * @return {Array} An array of properties in sequential order generated using the attributes passed into the function
 */
let __getMansionetteProperties = (
  firstNumber,
  lastNumber,
  propertyGroupId,
  options = { prefix: "", suffix: "" }
) => {
  let propertyTypeId = MANSIONETTE_PROPERTY_TYPE_ID;

  let properties = [];

  // Mansionettes
  for (let num = firstNumber; num <= lastNumber; num++) {
    // If a court number by the current number exists & there is no prefix (Meaning it doesn't belong to another cluster) ~ skip that mansionette number
    if (courtNumbers.includes(num) && !options.prefix) continue;

    let propertyNumPrefix = options.prefix || "M";
    let propertyNumSuffix = options.suffix || "";

    let propertyNumber = propertyNumPrefix + num + propertyNumSuffix;

    properties.push({
      propertyNumber,
      propertyTypeId,
      propertyGroupId,
    });
  }

  return properties;
};

/** Get courts database-mapped data
 * @return {Array} An array containing database mapped properties data
 */
let _getCourtsDbData = async () => {
  let courtPropertyGroupList = await PropertyGroup.findAll({
    where: {
      propertyGroupTypeId: COURT_GROUP_TYPE_ID,
    },
    attributes: {
      include: ["id", "propertyCount"],
    },
  });

  // Declare this outside the foreach to negate the need to flatten the array of properties (which would be the case if we had used `array.map()`)
  let courtsData = [];

  // Generate court properties for each property group (court) found
  courtPropertyGroupList.forEach((propertyGroup) => {
    //? Each property group represents a court
    let courtProperties = __getCourtHouses(
      1,
      propertyGroup.propertyCount,
      propertyGroup.id
    );
    courtsData.push(courtProperties);
  });

  //
  return courtsData;
};

/** Gets an object mapping of the property groups
 * @example `{
 * [propertyGroup.name]: {id: propertyGroup.id}}`
 * @return {Object} An object mapping of the property groups with the key being the name of the property group
 */
let __getPropertyGroupObj = (propertyGroupListFromDb) => {
  let propertyGroupObj = {};
  propertyGroupListFromDb.forEach((propertyGroup) => {
    // Sets a key on mZonePropertyGroupObj equivalent to the mZone name - makes for easier querying later on
    propertyGroupObj[propertyGroup.name] = {
      id: propertyGroup.id,
    };
  });

  return propertyGroupObj;
};

/** Get mansionette database-mapped data
 * @return {Array} An array containing database mapped properties data
 */
let _getMansionettesDbData = async () => {
  let mZonePropertyGroupList = await PropertyGroup.findAll({
    where: {
      propertyGroupTypeId: MANSIONETTE_GROUP_TYPE_ID,
    },
    attributes: {
      include: ["id", "name"],
    },
  });

  mZonePropertyGroupList = mZonePropertyGroupList;

  //? For easier access of data when trying to fetch the property group id
  let mZonePropertyGroupObj = __getPropertyGroupObj(mZonePropertyGroupList);

  // Declare this outside the foreach to negate the need to flatten the array of properties (which would be the case if we had used `array.map()`)
  let mansionettesData = [];

  // Generate mansionette properties for each property group (mansionette zone) found
  mZoneList.forEach((mZone) => {
    let mZonePropertyGroup = mZonePropertyGroupObj[mZone.name];
    let mZonePropertyGroupId = mZonePropertyGroup.id || null;

    mZone.houseRanges.forEach(({ first, last, prefix }) => {
      prefix = prefix || null;

      let mansionettes = __getMansionetteProperties(
        first,
        last,
        mZonePropertyGroupId,
        { prefix }
      );

      // Pushing directly to this to avoid flattening of array
      mansionettesData.push(mansionettes);
    });
  });

  return mansionettesData;
};

/** Get properties
 * @return {Array} An array containing properties with db data
 */
let getProperties = async () => {
  let courtsDbData = await _getCourtsDbData();
  let mansionettesDbData = await _getMansionettesDbData();

  let propertiesData = courtsDbData.concat(mansionettesDbData);

  return propertiesData;
};

//* EXPORTS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Clear the table before trying to insert data
    await queryInterface.bulkDelete(TABLE_NAME);

    let insertData = await getProperties();

    // Flatten the array & remove any empty values
    insertData = insertData.flat(1).filter((data) => data);

    try {
      await queryInterface.bulkInsert(TABLE_NAME, setDefaultDates(insertData,Sequelize));
    } catch (e) {
      console.error("Error found while trying to add properties: ", e.errors);
    }
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete(TABLE_NAME);
  },
};
