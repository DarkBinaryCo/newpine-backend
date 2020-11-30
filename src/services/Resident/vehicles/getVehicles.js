const { Resident, Vehicle } = require("../../../models");

/** Get vehicles
 * @param {Object} filter Vehicle query filter
 */
const getVehicles = async (filter = {}) => {
  let findOptions = {
    where: filter,
    include: { model: Resident, required: true },
    // attributes: attributesToInclude,
  };

  return Vehicle.findAll(findOptions);
};

//* EXPORTS
module.exports = getVehicles;
