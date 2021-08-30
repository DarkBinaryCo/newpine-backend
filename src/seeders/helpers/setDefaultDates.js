/** Set the `createdAt` and `updatedAt` attributes when seeding values into the database
 * @param {Array<Object>} arr The array of objects to set the default `createdAt` and `updatedAt` for
 * @param {Sequelize} Sequelize
 * @return {Array<Object>} An array of the objects provided with default dates for `createdAt` and `updatedAt` set using Sequelize
 */
module.exports = setDefaultDates = (arr, Sequelize) => {
  arr = arr.map((val) => {
    val.createdAt = Sequelize.fn("NOW");
    val.updatedAt = Sequelize.fn("NOW");

    return val;
  });

  return arr;
};
