// Models
const { Community } = require("../../../models");

/** Get a single community that matches the filter provided
 * @param {Object} filter The sequelize filter the community has to match to be returned
 * @param {Array<String>} extraAttributesToInclude An array of attributes to include along with the default included attributes
 * @return {Object|null} Return an object representing the community's data if found or null if no community is found
 */
const getSingleCommunity = async (filter, extraAttributesToInclude = []) => {
  let attributesToInclude = ["id", "name", "host", "type"];

  // Add extra attributes
  attributesToInclude = attributesToInclude.concat(extraAttributesToInclude);

  const communityFound = await Community.findOne({
    where: filter,
    attributes: attributesToInclude,
  });

  const communityData = communityFound ? communityFound.dataValues : null;
  return communityData;
};

//* EXPORTS
module.exports = getSingleCommunity;
