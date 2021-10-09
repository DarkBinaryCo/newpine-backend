// Models
const { Property } = require("../../../models");

/** Get all properties matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all properties
 * @return {Array<Object>} An array containing a list of properties found matching the given filter
 */
const getProperties = (filter = {}) => {
  //TODO: Improve this function ~  add more options
  return Property.findAll({ where: filter });
};

//* EXPORTS
module.exports = getProperties;
