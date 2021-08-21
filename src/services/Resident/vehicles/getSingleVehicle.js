// Models
const { Vehicle } = require("../../../models");

/** Get a single vehicle that matches the filter provided
 * @param {Object} filter The sequelize filter the vehicle has to match to be returned
 * @param {Array<String>} extraAttributesToInclude An array of attributes to include along with the default included attributes
 * @return {Object|null} Return an object representing the vehicle's data if found or null if no vehicle is found
 */
const getSingleVehicle = async (filter, extraAttributesToInclude = []) => {
  //
  let attributesToInclude = [
    "id",
    "name",
    "model",
    "numberplate",
    "residentId",
  ];

  // Add extra attributes
  attributesToInclude = attributesToInclude.concat(extraAttributesToInclude);

  const vehicleFound = await Vehicle.findOne({
    where: filter,
    attributes: attributesToInclude,
  });

  const vehicleData = vehicleFound ? vehicleFound.dataValues : null;
  return vehicleData;
};

//* EXPORTS
module.exports = getSingleVehicle;
