// Models
const { PropertyType } = require("../../models");

/** Get all property types matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all property types
 * @return {Array<Object>} An array containing a list of property types found matching the given filter
 */
const getPropertyTypes = (filter = {}) => {
  return PropertyType.findAll({ where: filter });
};

//* EXPORTS
module.exports = getPropertyTypes;
