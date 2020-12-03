const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

//
class SecurityShift extends Model {}

// Schema definition
SecurityShift.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  { sequelize, modelName: "SecurityShift", tableName: "security_shifts" }
);

//* EXPORTS
module.exports = SecurityShift;
