const { ResidentCheckin, Vehicle } = require("../../../models");

/** Get resident checkins by a filter
 * @param {Object} filter Resident checkin query filter
 * @param {Boolean} isAdmin Whether the caller of the function is an admin or not
 */
const getResidentCheckins = async (filter = {}, isAdmin = false) => {
  let findOptions = {
    where: filter,
    include: {
      model: Vehicle,
      required: true,
      /* attributes: [] */
    },
    paranoid: !isAdmin, //? Only admins can see all records (including paranoid deleted ones)
    order: [["updatedAt", "DESC"]],
  };

  return ResidentCheckin.findAll(findOptions);
};

//* EXPORTS
module.exports = getResidentCheckins;
