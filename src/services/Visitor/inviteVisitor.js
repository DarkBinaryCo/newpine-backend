const { VisitorInvitation } = require("../../models");

/** Invite a visitor. Residents can invite visitors
 * @param {Object} inviteData An object representing the invitation details
 */
const inviteVisitor = (inviteData) => {
  let settableFields = [
    "phone",
    "email",
    "residentInviterId",
    "fullName",
    "identificationTypeId",
    "identificationNumber",
    "transportMeans",
    "vehicleNumberplate",
    "isAdult",
  ];

  return VisitorInvitation.create(inviteData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = inviteVisitor;
