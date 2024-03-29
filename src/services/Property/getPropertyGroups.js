// Models
const { PropertyGroup, PropertyGroupType } = require("../../models");

/** Get all property groups matching a filter
 * @param {Object} filter Query filter. Defaults to `{}` thus fetching all property groups
 * @return {Array<Object>} An array containing a list of property groups found matching the given filter
 */
const getPropertyGroups = (filter = {}) => {
  return PropertyGroup.findAll({
    where: filter,
    include: {
      model: PropertyGroupType,
      attributes: ["name", "isIndependentCluster"],
    },
  });
};

//* EXPORTS
module.exports = getPropertyGroups;
