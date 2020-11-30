const { Resident } = require("../../../models");
const { FilterUtil } = require("../../../utils");

/** Update a resident
 * @param {Object} updateData Update data
 * @param {Object} filter Resident filter
 * @param {Boolean} isResidentRep Whether the person attempting to update is a resident representative
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const updateResident = async (
  updateData,
  filter = {},
  isResidentRep = false
) => {
  let filterAttrs = ["userId"];

  // Only admin should be able to update the active status
  if (!isResidentRep) {
    filterAttrs.push("isActive");
  }

  updateData = FilterUtil.filterObjAttrs(updateData, filterAttrs);

  return Resident.update(updateData, { where: filter });
};

//* EXPORTS
module.exports = updateResident;
