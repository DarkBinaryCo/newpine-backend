const { ResidentCheckin, Vehicle } = require("../../../models");

/** Get a single resident checkin by a filter
 * @param {String} filter Get filter
 * @param {Boolean} isAdmin Whether the caller of the function is an admin or not
 * @return {Object|null} An object containing the resident checkin found(if any) or null if no resident checkin by the `VisitorInvitationId` was found
 */
const getSingleResidentCheckin = async (filter, isAdmin = false) => {
  //TODO: Set the attributes that should be returned
  let residentCheckinFound = await ResidentCheckin.findOne({
    where: filter,
    paranoid: !isAdmin, //? Only admins can see all records (including paranoid deleted ones)
    include: {
      model: Vehicle,
      required: true,
      /* attributes: [] */
    },
  });

  const residentCheckinData = residentCheckinFound
    ? residentCheckinFound.dataValues
    : null;

  return residentCheckinData;
};

//* EXPORTS
module.exports = getSingleResidentCheckin;
