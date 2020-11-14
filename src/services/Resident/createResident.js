const { Resident } = require("../../models");
const { FilterUtil } = require("../../utils");

/** Create a resident account
 * @param {Object} insertData Data to be inserted into the database. Must contain user ID
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createResident = async (insertData) => {
  let _filterAttrs = ["id", "isActive"];
  insertData = FilterUtil.filterObjAttrs(insertData, _filterAttrs);

  return Resident.create(insertData);
};

//* EXPORTS
module.exports = createResident;
