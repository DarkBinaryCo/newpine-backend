const { ResidentCheckin } = require("../../../models");

/** Create a resident checkin
 * @param {Object} insertData Data to be inserted into the database
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createResidentCheckin = async (insertData) => {
  let settableFields = ["vehicleId", "securityGuardId", "isCheckin"];

  return ResidentCheckin.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createResidentCheckin;
