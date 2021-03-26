const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Config
const { USER_TYPE } = require("../../config/auth");

// Utils
const { FormatUtil } = require("../../utils");

// Dependencies
//! TODO: Find a way to use model aggregator ~ currently throws an error (can't find reference)
const IdentificationType = require("./IdentificationType");
const UserType = require("./UserType");

//
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
      set(value) {
        this.setDataValue(
          "phone",
          FormatUtil.getPhoneInternationalFormat(value)
        );
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: "Date of birth",
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["male", "female", "unknown"],
      defaultValue: "unknown",
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: USER_TYPE.RESIDENT,
      references: {
        model: "user_types", //? Table name
        key: "id",
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      comment: "Has the user completed the onboarding or not?",
    },
    identificationTypeId: {
      //! Possibly normalize this into its own table `usersIdentification`
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: "identification_types", //? Table name
        key: "id",
      },
    },
    identificationNumber: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    otp: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    lastOtpSentAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    profileImgUrl: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    profileImgThumbnailUrl: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    isAdult: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Is this user an adult or not?",
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

// Relationships
User.belongsTo(UserType, { foreignKey: "userTypeId" });
User.belongsTo(IdentificationType, { foreignKey: "identificationTypeId" });

//* EXPORTS
module.exports = User;
