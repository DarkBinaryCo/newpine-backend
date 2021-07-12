const { Resident, Vehicle } = require("../../../models");

/** Get vehicles
 * @param {Object} filter Vehicle query filter
 * @param {Boolean} includeResident Whether we should include the resident details or not
 */
const getVehicles = async (filter = {}, includeResident = true) => {
  let findOptions = {
    where: filter,
    order: [["updatedAt", "DESC"]],
  };

  // Only include the resident details if we have asked for them
  if (includeResident === true) {
    findOptions.include = { model: Resident, required: true };
  }

  return Vehicle.findAll(findOptions);
};

//* EXPORTS
module.exports = getVehicles;
