const { Vehicle } = require("../../../models");

/** Add a vehicle (to a resident's account)
 * @param {Object} insertData Data to be inserted into the database. Must contain user ID
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const addVehicle = async (insertData) => {
  let settableFields = ["numberPlate", "residentId"];

  return Vehicle.create(insertData, { fields: settableFields });
};

//* EXPORTS
module.exports = addVehicle;
