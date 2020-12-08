const { VisitorCheckin } = require("../../../models");

/** Create a resident checkin
 * @param {Object} insertData Data to be inserted into the database
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createVisitorCheckin = async (insertData) => {
  let settableFields = [["visitorInvitationId", "securityGuardId", "isCheckin"];

  return VisitorCheckin.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createVisitorCheckin;
