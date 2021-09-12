// Models
const { Community } = require("../../models");

/** Get all communities matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all communities
 * @return {Array<Object>} An array containing a list of communities found matching the given filter
 */
const getCommunities = (filter = {}) => {
  //TODO: Improve this function ~  add more options
  return Community.findAll({ where: filter });
};

//* EXPORTS
module.exports = getCommunities;
