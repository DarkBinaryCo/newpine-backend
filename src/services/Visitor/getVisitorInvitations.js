const { VisitorInvitation } = require("../../models");

/** Get visitor invitations based on a filter
 * @param {Object} filter The filter that determines which invitations are returned
 */
const getVisitorInvitations = (filter, isAdmin = false) => {
  const findOptions = {
    where: filter,
    paranoid: !isAdmin,
    order: [["updatedAt", "DESC"]],
  };

  return VisitorInvitation.findAll(findOptions);
};

//* EXPORTS
module.exports = getVisitorInvitations;
