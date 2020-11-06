const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

class PropertyGroupType extends Model {}

// Schema definition
PropertyGroupType.init(
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
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PropertyGroupType",
    tableName: "property_group_types",
  }
);

//* EXPORTS
module.exports = PropertyGroupType;
