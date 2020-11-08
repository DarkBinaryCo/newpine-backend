const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

class User extends Model {}

// Schema definition
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
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
      type: DataTypes.STRING(128),
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
  },
  { sequelize, modelName: "User" }
);

//* EXPORTS
module.exports = User;
