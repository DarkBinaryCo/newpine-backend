const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

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
    },
    propertyGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Property" }
);

//* EXPORTS
module.exports = Property;
