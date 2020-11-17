const { Resident, User } = require("../../models");

/** Get a single resident by their UserId
 * @param {String} userId The user ID of the resident you want to get
 * @return {Object|null} An object containing the resident found(if any) or null if no resident by the `userId` was found
 */
const getResidentByUserId = async (userId) => {
  const filter = {
    userId,
  };

  //TODO: Set the attributes that should be returned
  let residentFound = await Resident.findOne({
    where: filter,
    include: { model: User, required: true /* attributes: [] */ },
  });

  const residentData = residentFound ? residentFound.dataValues : null;

  return residentData;
};

//* EXPORTS
module.exports = getResidentByUserId;
