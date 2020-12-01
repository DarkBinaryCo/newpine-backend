const { VisitorInvitation } = require("../../models");

/** Get visitor invitations based on a filter
 * @param {Object} filter The filter that determines which invitations are returned
 */
const getVisitorInvitations = (filter, isAdmin = false) => {
  return VisitorInvitation.findAll({ where: filter, paranoid: !isAdmin });
};

//* EXPORTS
module.exports = getVisitorInvitations;
