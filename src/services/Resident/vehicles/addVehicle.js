const { Vehicle } = require("../../../models");

/** Add a vehicle (to a resident's account)
 * @param {Object} insertData Data to be inserted into the database. Must contain user ID
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const addVehicle = async (insertData) => {
  let settableFields = [
    "name",
    "model",
    "color",
    "year",
    "numberPlate",
    "residentId",
  ];

  return Vehicle.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = addVehicle;
