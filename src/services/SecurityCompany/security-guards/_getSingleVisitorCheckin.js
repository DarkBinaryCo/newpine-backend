// Models
const { VisitorCheckin } = require("../../../models");

/** Get a single visitor checkin  that matches the filter provided
 * @param {Object} filter The sequelize filter the visitor checkin  has to match to be returned
 * @return {Object|null} Return an object representing the visitor checkin 's data if found or null if no visitor checkin  is found
 */
const getSingleVisitorCheckin = async (filter) => {
  const visitorCheckin = await VisitorCheckin.findOne({
    where: filter,
    attributes: ["id", "visitorInvitationId", "isCheckin"],
  });

  const visitorCheckinData = visitorCheckin ? visitorCheckin.dataValues : null;
  return visitorCheckinData;
};

//* EXPORTS
module.exports = getSingleVisitorCheckin;
