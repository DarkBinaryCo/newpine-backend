const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

class IdentificationTypes extends Model {}

// Schema definition
IdentificationTypes.init(
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
    modelName: "IdentificationTypes",
    tableName: "identification_types",
  }
);

//* EXPORTS
module.exports = IdentificationTypes;
