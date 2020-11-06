const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

class PropertyGroup extends Model {}

// Schema definition
PropertyGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    phase: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    propertyGroupTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "PropertyGroup", tableName: "property_groups" }
);

//* EXPORTS
module.exports = PropertyGroup;
