const {
  PropertyGroup,
  PropertyGroupType,
  SecurityGuard,
  SecurityShift,
  User,
} = require("../../../models");

/** Get security guard
 * @param {Object} filter Security guard query filter
 */
const getSecurityGuards = async (filter = {}) => {
  // Security guard attributes to fetch
  const securityGuardFieldsToFetch = [
    "id",
    "propertyGroupId",
    "shiftId",
    "userId",
  ];

  // Property group related
  const propertyGroupFieldsToFetch = ["name", "phase"];
  const propertyGroupTypeFieldsToFetch = [
    "name",
    "friendlyName",
    "isIndependentCluster",
    "canHaveResidentAccount",
  ];

  //
  const securityShiftFieldsToFetch = ["name", "startTime", "endTime"];

  //
  const userFieldsToFetch = [
    "firstName",
    "lastName",
    "phone",
    "gender",
    "identificationTypeId",
    "identificationNumber",
    "isVerified",
    "isBanned",
  ];

  let findOptions = {
    where: filter,
    include: [
      {
        model: PropertyGroup,
        required: true,
        attributes: propertyGroupFieldsToFetch,
        include: {
          model: PropertyGroupType,
          attributes: propertyGroupTypeFieldsToFetch,
        },
      },
      {
        model: SecurityShift,
        required: true,
        attributes: securityShiftFieldsToFetch,
      },
      { model: User, required: true, attributes: userFieldsToFetch },
    ],
    attributes: securityGuardFieldsToFetch,
  };

  return SecurityGuard.findAll(findOptions);
};

//* EXPORTS
module.exports = getSecurityGuards;
