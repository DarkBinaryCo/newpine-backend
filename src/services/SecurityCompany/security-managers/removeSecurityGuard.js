const { SecurityGuard } = require("../../../models");
const { Op } = require("sequelize");

/** Remove a security guard
 * @param {String} filter The filter that will determine who is removed
 */
const removeResident = (filter = {}) => {
  return SecurityGuard.destroy({ where: filter });
};

//* EXPORTS
module.exports = removeResident;
