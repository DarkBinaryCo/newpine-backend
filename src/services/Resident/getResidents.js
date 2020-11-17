const { Resident, User } = require("../../models");

/** Get residents */
const getResidents = async (filter = {}, isAdmin = false) => {
  let findOptions = {
    where: filter,
    include: { model: User, required: true },
    // attributes: attributesToInclude,
  };

  // When a normal user requests residents, only return the non-deleted residents. Otherwise, if an admin requests the details, then they should get  all the residents ~ including the "deleted" ones.
  if (!isAdmin) {
    findOptions.paranoid = true;
  }

  return Resident.findAll(findOptions);
};

//* EXPORTS
module.exports = getResidents;
