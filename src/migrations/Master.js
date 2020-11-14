// Listed in the order they should be created in
const {
  UserType,
  User,
  AuthToken,
  PropertyType,
  PropertyGroupType,
  PropertyGroup,
  Property,
  Payment,
  Resident,
} = require("../models");

//* This migration syncs all models ~ creating every table in the database
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Order matters, so we can set the relationships correctly
    await UserType.sync();
    await User.sync();
    await AuthToken.sync();
    await PropertyType.sync();
    await PropertyGroupType.sync();
    await PropertyGroup.sync();
    await Property.sync();
    await Payment.sync();
    await Resident.sync();
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropDatabase();
  },
};
