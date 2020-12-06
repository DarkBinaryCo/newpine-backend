// Models
const { SecurityGuard } = require("../../models");

/** Update a user matching the `filter` with `updateData`
 * @param {Object} updateData Database information to update
 * @param {Object} filter User filter
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const updateSecurityGuard = async (updateData = {}, filter = {}) => {
  let settableFields = ["propertyGroupId", "shiftId"];

  return SecurityGuard.update(updateData, {
    where: filter,
    fields: settableFields,
  });
};

//* EXPORTS
module.exports = updateSecurityGuard;
