const db = require("../../database");
const { DataTypes } = require("sequelize");

//* MODEL DEPENDENCIES
/** Attributes expected in the database */
const _userAttributes = {
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  userTypeId: {
    type: DataTypes.INTEGER(8).UNSIGNED,
    allowNull: false,
    defaultValue: "4",
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: true,
  },
  lastOtpSentAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  countryId: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    defaultValue: "110",
  },
  profileImgUrl: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  profileImgThumbnailUrl: {
    type: DataTypes.STRING(128),
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

/** Schema definition */
const User = db.define("user", _userAttributes);

//* RELATIONSHIPS
// Payments
// User.hasMany(Payment, {
//   foreignKey: "userId",
// });

//* EXPORTS
module.exports = User;
