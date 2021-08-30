const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Utils
const { FormatUtil } = require("../../utils");

// Model dependencies
const { User } = require("../User");
const { Property } = require("../Property");

class Resident extends Model {}

// Schema definition
Resident.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", //? Table name
        key: "id",
      },
    },
    mpesaPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
      set(value) {
        this.setDataValue(
          "mpesaPhone",
          FormatUtil.getPhoneInternationalFormat(value)
        );
      },
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "properties", //? Table name
        key: "id",
      },
    },
    residentOwnerId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    residentType: {
      type: DataTypes.ENUM,
      values: ["owner", "tenant"],
      allowNull: false,
      defaultValue: "tenant",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "Resident", tableName: "residents", paranoid: true }
);

Resident.belongsTo(User, { foreignKey: "userId" });
Resident.belongsTo(Property, { foreignKey: "propertyId" });

//* EXPORTS
module.exports = Resident;
