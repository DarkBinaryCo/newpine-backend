// Models
const { Community } = require("../../models");

/** Update a community matching the `filter` with `updateData`
 * @param {Object} updateData Database information to update
 * @param {Object} filter Community filter
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const updateCommunity = async (updateData = {}, filter = {}) => {
  let settableFields = [
    "name",
    "type",
    "description",
    "location",
    "latitude",
    "longitude",
  ];

  // Actually update the community
  return Community.update(updateData, {
    where: filter,
    fields: settableFields,
  });
};

//* EXPORTS
module.exports = updateCommunity;
