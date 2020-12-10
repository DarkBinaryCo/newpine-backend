const { ResidentCheckin } = require("../../../models");

/** Remove a Resident checkin ([paranoid](https://sequelize.org/master/manual/paranoid.html) - doesn't actually delete the record)
 * This function [paranoid](https://sequelize.org/master/manual/paranoid.html) deletes a checkin for security accountability reasons
 * @param {Object} filter Delete filter
 * @return {Promise<Object>} A promise that resolves to an object with the update operation information
 */
const removeResidentCheckin = async (filter) => {
  return ResidentCheckin.destroy({ where: filter });
};

//* EXPORTS
module.exports = removeResidentCheckin;
