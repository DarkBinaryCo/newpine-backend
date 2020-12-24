const { Resident } = require("../../../models");

/** Create a resident account
 * @param {Object} insertData Data to be inserted into the database. Must contain user ID
 * @param {Boolean} isResidentOwner If we are the resident owner, then we should not be able to set our own residentOwnerId in the residents table
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createResident = async (insertData, isResidentOwner = false) => {
  let settableFields = ["userId", "mpesaPhone", "residentType", "propertyId"];

  // Non-resident owners can set their resident owner's id
  if (!isResidentOwner) {
    settableFields.push("residentOwnerId");
  }

  return Resident.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createResident;
