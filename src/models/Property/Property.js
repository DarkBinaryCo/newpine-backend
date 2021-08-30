const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

// Model dependencies
const PropertyType = require("./PropertyType");
const PropertyGroup = require("./PropertyGroup");

//
class Property extends Model {}

// Schema definition
Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    propertyNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    propertyTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "property_types",
        key: "id",
      },
    },
    propertyGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "property_groups",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Property", tableName: "properties" }
);

// Relationships
Property.belongsTo(PropertyType, { foreignKey: "propertyTypeId" });
Property.belongsTo(PropertyGroup, { foreignKey: "propertyGroupId" });

//* EXPORTS
module.exports = Property;
