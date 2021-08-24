// Models
const { User } = require("../../models");

/** Get all users matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all user types
 * @return {Array<Object>} An array containing a list of user types found matching the given filter
 */
const getUsers = (filter = {}) => {
  return User.findAll({ where: filter });
};

//* EXPORTS
module.exports = getUsers;
