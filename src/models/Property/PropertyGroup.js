const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

const PropertyGroupType = require("./PropertyGroupType");
const Community = require("./Community");

//
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
    propertyCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "The number of properties in this group",
    },
    phase: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    propertyGroupTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "property_group_types",
        key: "id",
      },
    },
    communityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "communities",
        key: "id",
      },
    },
  },
  { sequelize, modelName: "PropertyGroup", tableName: "property_groups" }
);

// Relationships
PropertyGroup.belongsTo(Community, { foreignKey: "communityId" });
PropertyGroup.belongsTo(PropertyGroupType, {
  foreignKey: "propertyGroupTypeId",
});

//* EXPORTS
module.exports = PropertyGroup;
