// Models
const { Community } = require("../../models");

/** Create a new community with `insertData`
 * @param {Object} insertData Data to enter into the database
 * @param {Boolean} isAdmin Admins can verify/unverify new accounts
 * @return {Promise<Object>} A promise that resolves to an object with the create operation information
 */
const createCommunity = async (insertData = {}) => {
  let settableFields = [
    "name",
    "host",
    "type",
    "description",
    "location",
    "latitude",
    "longitude",
  ];

  return Community.create(insertData, {
    fields: settableFields,
    returning: true,
  });
};

//* EXPORTS
module.exports = createCommunity;
