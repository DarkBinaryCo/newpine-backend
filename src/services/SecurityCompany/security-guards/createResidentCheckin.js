const { ResidentCheckin } = require("../../../models");

/** Create a resident checkin
 * @param {UUID} residentId The id of the resident being checked in
 * @param {UUID} securityGuardId The id of the security guard checking in the resident
 * @param {boolean} isCheckin Is this a checkin(`true`) or a checkout(`false`)
 * @param {{vehicleId: string}} insertData Data to be inserted into the database. Default `{}`
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createResidentCheckin = async (
  residentId,
  securityGuardId,
  isCheckin,
  insertData = {}
) => {
  let settableFields = [
    "residentId",
    "propertyGroupId",
    "securityGuardId",
    "vehicleId",
    "isCheckin",
  ];

  // Explicitly add the resident id and security id data to the `insertData` object
  insertData = { ...insertData, isCheckin, residentId, securityGuardId };

  return ResidentCheckin.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createResidentCheckin;
