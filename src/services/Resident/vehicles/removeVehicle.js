const { Vehicle } = require("../../../models");

/** Remove a vehicle
 * @param {String} filter The filter that will determine who is removed
 */
const removeVehicle = (filter = {}) => {
  return Vehicle.destroy({ where: filter });
};

//* EXPORTS
module.exports = removeVehicle;
