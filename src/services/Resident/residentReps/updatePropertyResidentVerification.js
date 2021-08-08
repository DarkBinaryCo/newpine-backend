// Import directly from main service aggregator
const UserService = require("../../User");

// Import from within the same service but a different directory
const { getResidents, updateResident } = require("../residents");

/** Update the verification status of residents belonging to a certain property
 * @param {Int} propertyId The id of the property whose residents accounts we want to activate
 * @param {Boolean} isVerify Whether to activate or deactivate these accounts. Defaults to `true` - 'activate'
 */
const updatePropertyResidentVerification = async (
  propertyId,
  isVerify = true
) => {
  // We'll use this resident list to individually update users
  const residentsToUpdate = await getResidents({ propertyId });

  // No point proceeding if we have no residents to update
  if (!residentsToUpdate.length) return false;

  // Update the resident accounts
  //! Potential performance bottleneck ~ O(n+2) operations to verify residents where `n` is the number of residents in a property
  return updateResident({ isVerified: isVerify }, { propertyId }, true).then(
    () => {
      // Update the individual users belonging to the resident accounts
      residentsToUpdate.forEach(async (resident) => {
        const userUpdateFilter = { id: resident.userId };

        await UserService.updateUser(
          { isVerified: isVerify },
          userUpdateFilter,
          true
        );
      });
    }
  );
};

//* EXPORTS
module.exports = updatePropertyResidentVerification;
