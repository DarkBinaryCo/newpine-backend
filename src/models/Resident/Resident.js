const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

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
        model: "users",
        key: "id",
      },
    },
    mpesaPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "properties",
        key: "id",
      },
    },
    residentOwnerId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "Resident" }
);

//* EXPORTS
module.exports = Resident;
