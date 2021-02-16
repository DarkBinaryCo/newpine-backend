const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

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
      comment: "The administrative name of this property group type",
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    isIndependentCluster: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    friendlyName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "A name by which this is referred to by the general public",
    },
    canHaveResidentAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
