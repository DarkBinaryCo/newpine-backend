// Models
const { User } = require("../../models");

/** Get a single user that matches the filter provided
 * @param {Object} filter The sequelize filter the user has to match to be returned
 * @param {Array<String>} extraAttributesToInclude An array of attributes to include along with the default included attributes
 * @return {Object|null} Return an object representing the user's data if found or null if no user is found
 */
const getSingleUser = async (filter, extraAttributesToInclude = []) => {
  //TODO : Refactor defaults to config file
  let attributesToInclude = ["firstName", "lastName", "phone", "userTypeId"];

  // Add extra attributes
  attributesToInclude = attributesToInclude.concat(extraAttributesToInclude);

  //TODO: Add unit test for this ~ insert data before test and delete after test. Use function to test if the data is retrieved
  const userFound = await User.findOne({
    where: filter,
    attributes: attributesToInclude,
  });

  const userData = userFound ? userFound.dataValues : null;
  return userData;
};

//* EXPORTS
module.exports = getSingleUser;
