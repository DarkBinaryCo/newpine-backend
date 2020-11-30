// Models
const { User } = require("../../models");

// Internal ~ UserService specific
const getUserByPhone = require("./getUserByPhone");
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
    "userTypeId",
    "bio",
    "profileImgUrl",
    "profileImgThumbnailUrl",
  ];

  // If phone number has been provided ~ check if a user with that phone number already exists
  if (insertData.phone) {
    const userWithPhone = await getUserByPhone(insertData.phone);

    // Update user instead of user with that phone already exists
    if (userWithPhone) {
      const _updateFilter = {
        phone: insertData.phone,
      };

      return updateUser(insertData, _updateFilter);
    }
  }

  return User.create(insertData, { fields: settableFields });
};

//* EXPORTS
module.exports = createUser;
