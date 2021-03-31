const { VisitorCheckin, VisitorInvitation } = require("../../../models");

/** Get Visitor invitation checkins by a filter
 * @param {Object} filter Visitor invitation checkin query filter
 * @param {Boolean} isAdmin Whether the caller of the function is an admin or not
 */
const getVisitorCheckins = async (filter = {}, isAdmin = false) => {
  let findOptions = {
    where: filter,
    include: { model: VisitorInvitation, required: true },
    paranoid: !isAdmin, //? Only admins can see all records (including paranoid deleted ones)
    order: [["updatedAt", "DESC"]],
  };

  return VisitorCheckin.findAll(findOptions);
};

//* EXPORTS
module.exports = getVisitorCheckins;
