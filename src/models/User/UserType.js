const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

class UserType extends Model {}

// Schema definition
UserType.init(
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
  { sequelize, modelName: "UserType", tableName: "user_types" }
);

//* EXPORTS
module.exports = UserType;
