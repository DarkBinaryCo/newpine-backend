const { VisitorInvitation } = require("../../models");

/** Update a visitor's invitation based on a filter
 * @param {Object} updateData The data that will be used to updated the invitation
 * @param {Object} filter The filter that determines which invitations are returned
 */
const updateVisitorInvitations = (updateData, filter) => {
  let settableFields = [
    "fullName",
    "phone",
    "email",
    "identificationTypeId",
    "identificationNumber",
    "transportMeans",
    "vehicleNumberplate",
    "isAdult",
    "isActive",
  ];

  return VisitorInvitation.update(updateData, {
    where: filter,
    fields: settableFields,
  });
};

//* EXPORTS
module.exports = updateVisitorInvitations;
