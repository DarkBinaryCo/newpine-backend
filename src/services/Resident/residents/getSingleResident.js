const { Resident, User } = require("../../../models");

/** Get a single resident by their UserId
 * @param {String} filter Get filter
 * @return {Object|null} An object containing the resident found(if any) or null if no resident by the `userId` was found
 */
const getSingleResident = async (filter) => {
  //TODO: Set the attributes that should be returned
  let residentFound = await Resident.findOne({
    where: filter,
    include: { model: User, required: true /* attributes: [] */ },
  });

  const residentData = residentFound ? residentFound.dataValues : null;

  return residentData;
};

//* EXPORTS
module.exports = getSingleResident;
