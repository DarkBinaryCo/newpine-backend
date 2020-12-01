const { VisitorInvitation } = require("../../models");

/** Revoke a visitor's invitation based on a filter
 * @param {Object} filter The filter that determines which invitation is revoked
 */
const revokeVisitorInvitation = (filter) => {
  return VisitorInvitation.destroy({ where: filter });
};

//* EXPORTS
module.exports = revokeVisitorInvitation;
