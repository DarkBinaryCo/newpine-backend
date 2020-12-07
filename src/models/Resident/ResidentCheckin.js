const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Model dependencies
const Resident = require("./Resident");
const { SecurityGuard } = require("../SecurityCompany");

class ResidentCheckin extends Model {}

// Schema definition
ResidentCheckin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    residentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "residents", //? Table name
        key: "id",
      },
    },
    securityGuardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "security_guards", //? Table name
        key: "id",
      },
    },
    dateCheckin: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    dateCheckout: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "ResidentCheckin",
    tableName: "resident_checkins",
    paranoid: true,
  }
);

//
ResidentCheckin.belongsTo(Resident, { foreignKey: "residentId" });
ResidentCheckin.belongsTo(SecurityGuard, { foreignKey: "securityGuardId" });

//* EXPORTS
module.exports = ResidentCheckin;
