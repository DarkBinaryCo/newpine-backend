// Models
const { IdentificationType } = require("../../models");

/** Get all identification types matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all identification types
 * @return {Array<Object>} An array containing a list of identification types found matching the given filter
 */
const getIdentificationTypes = (filter = {}) => {
  return IdentificationType.findAll({ where: filter });
};

//* EXPORTS
module.exports = getIdentificationTypes;
