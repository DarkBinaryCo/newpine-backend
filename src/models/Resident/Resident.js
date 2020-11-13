const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Model references
const { User, Property } = require("../index");

// Schema definition
class Resident extends Model {}

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
    },
    mpesaPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

//* RELATIONSHIPS
Resident.belongsTo(User, { foreignKey: "userId" });
Resident.hasOne(Property, { foreignKey: "propertyId" });

//* EXPORTS
module.exports = Resident;
