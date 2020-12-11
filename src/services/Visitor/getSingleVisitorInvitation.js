// Models
const { VisitorInvitation } = require("../../models");

/** Get a single visitor invitation  that matches the filter provided
 * @param {Object} filter The sequelize filter the visitor invitation  has to match to be returned
 * @return {Object|null} Return an object representing the visitor invitation 's data if found or null if no visitor invitation  is found
 */
const getSingleVisitorInvitation = async (filter) => {
  const visitorInvitation = await VisitorInvitation.findOne({ where: filter });

  const visitorInvitationData = visitorInvitation
    ? visitorInvitation.dataValues
    : null;
  return visitorInvitationData;
};

//* EXPORTS
module.exports = getSingleVisitorInvitation;
