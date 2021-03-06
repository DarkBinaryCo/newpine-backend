// Constants
const { USER_TYPE } = require("../../config/auth");

// Models
const { User } = require("../../models");

// Internal ~ UserService specific
const getSingleUser = require("./getSingleUser");
const updateUser = require("./updateUser");

/** Create a new user with `insertData`
 * @param {Object} insertData Data to enter into the database
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createUser = async (insertData = {}) => {
  let settableFields = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "dob",
    "gender",
    "userTypeId",
    "bio",
    "profileImgUrl",
    "profileImgThumbnailUrl",
  ];

  // If phone number has been provided ~ check if a user with that phone number already exists
  if (insertData.phone) {
    const userWithPhone = await getSingleUser({ phone: insertData.phone });

    // Update user instead of user with that phone already exists
    if (userWithPhone) {
      const _updateFilter = {
        phone: insertData.phone,
      };

      return updateUser(insertData, _updateFilter);
    }
  }

  // If a userTypeId has been provided - only add it if it is a valid user type ID
  if ((userTypeIdEntered = parseInt(insertData.userTypeId))) {
    const possibleUserTypes = Object.values(USER_TYPE);

    // Was the userTypeIdEntered a valid ID ? If so, then
    if (possibleUserTypes.includes(userTypeIdEntered)) {
      insertData.userTypeId = userTypeIdEntered;
    } else {
      // Invalid user type ID - unset it and let the database set the appropriate default value (specified by the Model)
      insertData.userTypeId = undefined;
    }
  }

  return User.create(insertData, { fields: settableFields, returning: true });
};

//* EXPORTS
module.exports = createUser;
