const { Vehicle } = require("../../../models");

/** Update a vehicle
 * @param {Object} updateData Update data
 * @param {Object} filter Vehicle filter
 * @param {Boolean} isResidentRep Whether the person attempting to update is a resident representative (resident admin)
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const updateVehicle = async (updateData, filter = {}) => {
  // Updateable fields
  let settableFields = ["name", "model", "color", "year", "isVerified"];

  return Vehicle.update(updateData, { where: filter, fields: settableFields });
};

//* EXPORTS
module.exports = updateVehicle;
