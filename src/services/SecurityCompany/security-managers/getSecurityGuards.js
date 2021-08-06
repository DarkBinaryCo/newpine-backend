const { SecurityGuard, SecurityShift, User } = require("../../../models");

/** Get security guard
 * @param {Object} filter Security guard query filter
 */
const getSecurityGuards = async (filter = {}) => {
  //
  const securityShiftFieldsToFetch = ["name", "startTime", "endTime"];

  //
  const userFieldsToFetch = [
    "firstName",
    "lastName",
    "phone",
    "gender",
    "isVerified",
    "isBanned",
  ];

  let findOptions = {
    where: filter,
    include: [
      { model: User, required: true, attributes: userFieldsToFetch },
      {
        model: SecurityShift,
        required: true,
        attributes: securityShiftFieldsToFetch,
      },
    ],
    // attributes: attributesToInclude,
  };

  return SecurityGuard.findAll(findOptions);
};

//* EXPORTS
module.exports = getSecurityGuards;
