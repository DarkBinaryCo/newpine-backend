const { Resident } = require("../../models");
const { FilterUtil } = require("../../utils");

/** Create a resident account
 * @param {Object} insertData Data to be inserted into the database. Must contain user ID
 * @param {Boolean} isResidentOwner If we are the resident owner, then we should not be able to set our own residentOwnerId in the residents table
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createResident = async (insertData, isResidentOwner = false) => {
  let _filterAttrs = ["id", "isActive"];

  // If we are the resident owner, then we should not be able to set our own residentOwnerId in the residents table
  if (isResidentOwner) {
    _filterAttrs.push("residentOwnerId"); //? Unset it if it has been set
  }

  insertData = FilterUtil.filterObjAttrs(insertData, _filterAttrs);

  return Resident.create(insertData);
};

//* EXPORTS
module.exports = createResident;
