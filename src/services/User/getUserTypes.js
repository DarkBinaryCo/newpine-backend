// Models
const { UserType } = require("../../models");

/** Get all user types matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all user types
 * @return {Array<Object>} An array containing a list of user types found matching the given filter
 */
const getUserTypes = (filter = {}) => {
  return UserType.findAll({ where: filter });
};

//* EXPORTS
module.exports = getUserTypes;
