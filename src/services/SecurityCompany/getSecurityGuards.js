const { SecurityGuard, User } = require("../../models");

/** Get security guard
 * @param {Object} filter Security guard query filter
 */
const getSecurityGuards = async (filter = {}) => {
  let findOptions = {
    where: filter,
    include: { model: User, required: true },
    // attributes: attributesToInclude,
  };

  return SecurityGuard.findAll(findOptions);
};

//* EXPORTS
module.exports = getSecurityGuards;
