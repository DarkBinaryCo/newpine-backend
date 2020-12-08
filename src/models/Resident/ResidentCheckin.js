const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Model dependencies
const { Vehicle } = require("../Vehicle");
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
    vehicleId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      references: {
        model: "vehicles", //? Table name
        key: "id",
      },
      comment:
        "This assumes that all residents that checkin check in through a vehicle",
    },
    securityGuardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "security_guards", //? Table name
        key: "id",
      },
    },
    isCheckin: {
      //? Used as such to prevent complications of trying to figure out whether we should update an existing checkin or create a new checkin/checkout
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "If true, it was a checkin; if false, it was a checkout",
    },
    dateInitiated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "ResidentCheckin",
    tableName: "resident_checkins",
    paranoid: true,
  }
);

// Relationships
ResidentCheckin.belongsTo(Vehicle, { foreignKey: "vehicleId" });
ResidentCheckin.belongsTo(SecurityGuard, { foreignKey: "securityGuardId" });

//* EXPORTS
module.exports = ResidentCheckin;
