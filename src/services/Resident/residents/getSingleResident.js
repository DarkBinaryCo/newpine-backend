const {
  Resident,
  Property,
  PropertyGroup,
  PropertyGroupType,
  PropertyType,
  User,
} = require("../../../models");

/** Get a single resident by a filter
 * @param {String} filter Get filter
 * @param {Boolean} isAdmin Whether the caller of the function is an admin or not. Admins can view 'deleted' resident accounts.
 * @param {Boolean} includeUser Whether to include the user details as part of the resident data
 * @param {Boolean} includeProperty Whether to include the property details as part of the resident data
 * @return {Object|null} An object containing the resident found(if any) or null if no resident by the `userId` was found
 */
const getSingleResident = async (
  filter,
  isAdmin = false,
  includeUser = false,
  includeProperty = true
) => {
  //TODO: Set the attributes that should be returned
  const findOptions = {
    where: filter,
    paranoid: !isAdmin, //? Only admins can see all records (including paranoid deleted ones)
    include: [],
  };

  // Include user data
  if (includeUser === true) {
    findOptions.include.push({
      model: User,
      required: true,
      attributes: ["id", "firstName", "lastName", "gender", "dob"],
    });
  }

  // Include property data
  if (includeProperty === true) {
    findOptions.include.push({
      model: Property,
      required: true,
      attributes: ["id", "propertyGroupId", "propertyNumber", "propertyTypeId"],
      include: [
        {
          model: PropertyGroup,
          required: true,
          attributes: ["id", "name", "phase", "propertyGroupTypeId"],
          include: {
            model: PropertyGroupType,
            required: true,
            attributes: ["id", "name", "isIndependentCluster"],
          },
        },
        {
          model: PropertyType,
          required: true,
          attributes: ["id", "name"],
        },
      ],
    });
  }

  // Actually find the resident
  let residentFound = await Resident.findOne(findOptions);

  //
  const residentData = residentFound ? residentFound.dataValues : null;

  return residentData;
};

//* EXPORTS
module.exports = getSingleResident;
