const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

const { Resident } = require("../Resident");
//
class Vehicle extends Model {}

// Schema definition
Vehicle.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    numberPlate: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
    },
    residentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "residents", //? Table name
        key: "id",
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { sequelize, modelName: "Vehicle" }
);

// Relationships
Vehicle.belongsTo(Resident, { foreignKey: "residentId" });

//* EXPORTS
module.exports = Vehicle;
