const { Resident, User } = require("../../../models");

/** Get residents
 * @param {Object} filter Resident query filter
 * @param {Boolean} isAdmin Whether the caller of the function is an admin or not
 */
const getResidents = async (filter = {}, isAdmin = false) => {
  let findOptions = {
    where: filter,
    include: {
      model: User,
      required: true,
      attributes: [
        "firstName",
        "lastName",
        "phone",
        "email",
        "userTypeId",
        "userType",
        "identificationTypeId",
        "identificationNumber",
        "isAdult",
        "isNew",
      ],
    },
    paranoid: !isAdmin, //? Only admins can see all records (including paranoid deleted ones)
    // attributes: attributesToInclude,
  };

  return Resident.findAll(findOptions);
};

//* EXPORTS
module.exports = getResidents;
