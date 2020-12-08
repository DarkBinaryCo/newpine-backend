// Models
const { SecurityGuard } = require("../../../models");

/** Create security guard
 * @param {Object} insertData Database information to insert
 * @return {Promise<Object>} A promise that resolves to an object with the insert operation information
 */
const createSecurityGuard = async (insertData = {}) => {
  let settableFields = ["userId", "propertyGroupId", "shiftId"];

  return SecurityGuard.create(insertData, {
    fields: settableFields,
  });
};

//* EXPORTS
module.exports = createSecurityGuard;
