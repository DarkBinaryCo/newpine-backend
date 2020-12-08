const { SecurityGuard, User } = require("../../../models");

/** Get security guard by a filter
 * @param {Object} filter Security guard query filter
 */
const getSingleSecurityGuard = async (filter = {}) => {
  let findOptions = {
    where: filter,
    include: { model: User, required: true },
    // attributes: attributesToInclude,
  };

  const securityGuardFound = await SecurityGuard.findOne({
    where: filter,
    /* attributes: []*/
  });

  const securityGuardData = securityGuardFound
    ? securityGuardFound.dataValues
    : null;

  return securityGuardData;
};

//* EXPORTS
module.exports = getSingleSecurityGuard;
