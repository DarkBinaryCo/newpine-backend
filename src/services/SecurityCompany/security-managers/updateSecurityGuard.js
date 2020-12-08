// Models
const { SecurityGuard } = require("../../../models");

/** Update a Security guard matching the `filter` with `updateData`. This can only be used by security managers. Security guards can only update the user part of their account
 * @param {Object} updateData Database information to update
 * @param {Object} filter Security guard filter
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
