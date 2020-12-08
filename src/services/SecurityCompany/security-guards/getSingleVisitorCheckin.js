const { VisitorCheckin, VisitorInvitation } = require("../../../models");

/** Get a single visitor checkin by a filter
 * @param {String} filter Get filter
 * @param {Boolean} isAdmin Whether the caller of the function is an admin or not
 * @return {Object|null} An object containing the visitor checkin found(if any) or null if no visitor checkin by the `VisitorInvitationId` was found
 */
const getSingleVisitorCheckin = async (filter, isAdmin = false) => {
  //TODO: Set the attributes that should be returned
  let visitorCheckinFound = await VisitorCheckin.findOne({
    where: filter,
    paranoid: !isAdmin, //? Only admins can see all records (including paranoid deleted ones)
    include: {
      model: VisitorInvitation,
      required: true,
      /* attributes: [] */
    },
  });

  const visitorCheckinData = visitorCheckinFound
    ? visitorCheckinFound.dataValues
    : null;

  return visitorCheckinData;
};

//* EXPORTS
module.exports = getSingleVisitorCheckin;
