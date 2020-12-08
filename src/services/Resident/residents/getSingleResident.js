const { Resident, User } = require("../../../models");

/** Get a single resident by a filter
 * @param {String} filter Get filter
 * @param {Boolean} isAdmin Whether the caller of the function is an admin or not
 * @return {Object|null} An object containing the resident found(if any) or null if no resident by the `userId` was found
 */
const getSingleResident = async (filter, isAdmin = false) => {
  //TODO: Set the attributes that should be returned
  let residentFound = await Resident.findOne({
    where: filter,
    paranoid: !isAdmin, //? Only admins can see all records (including paranoid deleted ones)
    include: {
      model: User,
      required: true,
      /* attributes: [] */
    },
  });

  const residentData = residentFound ? residentFound.dataValues : null;

  return residentData;
};

//* EXPORTS
module.exports = getSingleResident;
