const { DEFAULT_COMMUNITY_ID } = require("../config");

/** Set the default community in a given array
 * @param {Array<Object>} arr The array of objects to set the default community
 * @return {Array<Object>} An array of the objects provided with default dates for `createdAt` and `updatedAt` set using Sequelize
 */
module.exports = setDefaultDates = (arr) => {
  arr = arr.map((val) => {
    val.communityId = DEFAULT_COMMUNITY_ID;

    return val;
  });

  return arr;
};
