const { VisitorCheckin } = require("../../../models");

// Services
//! Find a way to use the services aggregator
const VisitorService = require("../../../services/Visitor");

/** Create a resident checkin
 * @param {UUID} visitorInvitationId The id of the visitor invitation
 * @param {UUID} securityGuardId The id of the security guard checking in the resident
 * @param {boolean} isCheckin Is this a checkin(`true`) or a checkout(`false`)
 * @param {{propertyId: number}} insertData Data to be inserted into the database
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createVisitorCheckin = async (
  visitorInvitationId,
  securityGuardId,
  isCheckin,
  insertData = {}
) => {
  let settableFields = [
    "propertyId",
    "securityGuardId",
    "visitorInvitationId",
    "isCheckin",
  ];

  // Visitor invitation
  const invitationFound = await VisitorService.getSingleVisitorInvitation({
    id: visitorInvitationId,
  });

  // No point going on if there is no visitor invitation to map to the checkin
  if (!invitationFound) {
    throw new Error(
      "Could not find a visitor invitation with that ID. Please try again with a valid visitor invitation id"
    );
  }

  //* Getting here means there was a visitor invitation found that had the provided visitor invitation id
  // When we attempt to checkin a visitor with an invitation that has already been used, don't allow them to  checkin
  if (!invitationFound.isActive && isCheckin) {
    throw new Error(
      "Checkin failed. That invitation id has already been used and cannot be re-used."
    );
  }

  //* Getting here means the visitor invitation has not yet been used or the user is checking out
  // De-activate the visitor invitation as soon as they have been checked-in
  let updateFilter = { id: visitorInvitationId };

  // De-activating means the visitor can be checked out but they cannot use the same invitation to get in
  VisitorService.updateVisitorInvitation(updateFilter, { isActive: false });

  // Explicitly add the and security guard id data to the `insertData` object
  insertData = {
    ...insertData,
    isCheckin,
    securityGuardId,
    visitorInvitationId,
  };

  return VisitorCheckin.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createVisitorCheckin;
