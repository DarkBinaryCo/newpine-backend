// Models
const { SecurityShift } = require("../../../models");

/** Get all security shifts matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all security shifts
 * @return {Array<Object>} An array containing a list of security shifts found matching the given filter
 */
const getSecurityShifts = (filter = {}) => {
  return SecurityShift.findAll({ where: filter });
};

//* EXPORTS
module.exports = getSecurityShifts;
