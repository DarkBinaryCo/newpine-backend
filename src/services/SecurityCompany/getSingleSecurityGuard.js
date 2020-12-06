const { SecurityGuard, User } = require("../../models");

/** Get security guard by a filter
 * @param {Object} filter Security guard query filter
 */
const getSingleSecurityGuard = async (filter = {}) => {
  let findOptions = {
    where: filter,
    include: { model: User, required: true },
    // attributes: attributesToInclude,
  };

  return SecurityGuard.findByPk(securityGuardId, findOptions);
};

//* EXPORTS
module.exports = getSingleSecurityGuard;
