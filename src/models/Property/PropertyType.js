const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

class PropertyType extends Model {}

// Schema definition
PropertyType.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: null,
    },
  },
  { sequelize, modelName: "PropertyType", tableName: "property_types" }
);

//* EXPORTS
module.exports = PropertyType;
