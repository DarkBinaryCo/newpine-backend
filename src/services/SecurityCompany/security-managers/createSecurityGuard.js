const uuid = require("uuid");

// Models
const { SecurityGuard } = require("../../../models");

/** Add a single security guard
 * @param {Object} insertData An object containing the data of the security guard to be added
 * @return {Promise<Object>} A promise that resolves to an object with the insert operation information
 */
const createSecurityGuard = async (insertData) => {
  insertData.id = uuid.v4();

  let settableFields = ["id", "userId", "propertyGroupId", "shiftId"];

  return SecurityGuard.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createSecurityGuard;
