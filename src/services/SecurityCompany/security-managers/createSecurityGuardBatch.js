const uuid = require("uuid");

// Models
const { SecurityGuard } = require("../../../models");

/** Create security guards
 * @param {Array<Object>} insertData Database information to insert
 * @return {Promise<Object>} A promise that resolves to an object with the insert operation information
 */
const createSecurityGuardBatch = async (insertData) => {
  insertData = insertData.map((securityGuard) => {
    //? Generate unique ID for each security guard created
    securityGuard.id = uuid.v4();
    return securityGuard;
  });

  let settableFields = ["id", "userId", "propertyGroupId", "shiftId"];

  return SecurityGuard.bulkCreate(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createSecurityGuardBatch;
