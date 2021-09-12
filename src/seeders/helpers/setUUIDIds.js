const uuid = require("uuid");

/** Set the `id` values in an array to uuid v4 values
 * @param {Array<Object>} arr The array of objects to set the default `id` for
 * @return {Array<Object>} An array of the objects provided with default dates for `id` set using Sequelize
 */
module.exports = setUUIDIds = (arr) => {
  arr = arr.map((val) => {
    val.id = uuid.v4();

    return val;
  });

  return arr;
};
