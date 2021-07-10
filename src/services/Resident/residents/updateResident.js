const { Resident } = require("../../../models");

/** Update a resident
 * @param {Object} updateData Update data
 * @param {Object} filter Resident filter
 * @param {Boolean} isResidentRep Whether the person attempting to update is a resident representative (resident admin)
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const updateResident = async (
  updateData,
  filter = {},
  isResidentRep = false
) => {
  // Updateable fields
  let settableFields = ["mpesaPhone", "propertyId"];

  // Only resident admin should be able to update the active status
  if (isResidentRep) {
    settableFields.push("isActive", "isVerified", "residentType");
  }

  return Resident.update(updateData, { where: filter, fields: settableFields });
};

//* EXPORTS
module.exports = updateResident;
