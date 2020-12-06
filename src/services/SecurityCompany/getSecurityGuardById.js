const { SecurityGuard, User } = require("../../models");

/** Get security guard by their id
 * @param {Object} filter Security guard query filter
 */
const getSecurityGuardById = async (securityGuardId) => {
  let findOptions = {
    where: filter,
    include: { model: User, required: true },
    // attributes: attributesToInclude,
  };

  return SecurityGuard.findByPk(securityGuardId, findOptions);
};

//* EXPORTS
module.exports = getSecurityGuardById;
