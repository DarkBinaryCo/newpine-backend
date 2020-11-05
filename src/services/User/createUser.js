// Models
const { User } = require("../../models");

const { filterObjAttrs } = require("../../utils/filter");

// Internal ~ UserService specific
const getUserById = require("./getUserById");
const getUserByPhone = require("./getUserByPhone");
const updateUser = require("./updateUser");

/** Create a new user with `insertData`
 * @param {Object} insertData Data to enter into the database
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createUser = async (insertData = {}) => {
  //REVIEW: Possibly reduce number of database requests being made when trying to create user ~ currently 2 getUser requests
  // Attributes that shouldn't be editable ~ unsetting them if set
  insertData = filterObjAttrs(insertData, [
    "id",
    "isBanned",
    "isVerified",
    "createdAt",
    "updatedAt",
  ]);

  // If phone number has been provided ~ check if a user with that phone number already exists
  if (insertData.phone) {
    const userWithPhone = await getUserByPhone(insertData.phone);

    // Update user instead of user with that phone already exists
    if (userWithPhone) {
      const updateStatus = updateUser(
        {
          phone: insertData.phone,
        },
        insertData
      );
      console.info(
        `User with phone: ${insertData.phone} was found, updating instead of creating new account...`
      );

      return updateStatus;
    }
  }

  const createStatus = User.create(insertData);

  return createStatus;
};

//* EXPORTS
module.exports = createUser;
