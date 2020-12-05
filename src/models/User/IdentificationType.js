const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

class IdentificationType extends Model {}

// Schema definition
IdentificationType.init(
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
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "IdentificationType",
    tableName: "identification_types",
  }
);

//* EXPORTS
module.exports = IdentificationType;
