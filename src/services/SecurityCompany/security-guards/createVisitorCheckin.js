const { VisitorCheckin } = require("../../../models");

// Services
//! Find a way to use the services aggregator
const VisitorService = require("../../../services/Visitor");

/** Create a resident checkin
 * @param {Object} insertData Data to be inserted into the database
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createVisitorCheckin = async (insertData) => {
  let settableFields = ["visitorInvitationId", "securityGuardId", "isCheckin"];

  // De-activate the visitor invitation as soon as they have been checked-in
  let updateFilter = { id: insertData.visitorInvitationId };
  let updateData = { isActive: false };

  //? De-activating means the visitor can be checked out but they cannot use the same invitation to get in
  VisitorService.updateVisitorInvitation(updateData, updateFilter);

  return VisitorCheckin.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createVisitorCheckin;
