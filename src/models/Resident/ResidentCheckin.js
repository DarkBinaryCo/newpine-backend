const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Model dependencies
const { PropertyGroup, Community } = require("../Property");
const Resident = require("../Resident/Resident");
const { SecurityGuard } = require("../SecurityCompany");
const { Vehicle } = require("../Vehicle");

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
        model: "residents",
        key: "id",
      },
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
    propertyGroupId: {
      type: DataTypes.INTEGER,
      comment:
        "The id of the property group they are going to. Set here because guards may be re-assigned which may prevent us from being able to get accurate checkin data",
      allowNull: true,
      defaultValue: null,
      references: {
        model: "property_groups", //? Table name
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
    communityId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "communities",
        key: "id",
      },
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
ResidentCheckin.belongsTo(Community, { foreignKey: "communityId" });
ResidentCheckin.belongsTo(PropertyGroup, { foreignKey: "propertyGroupId" });
ResidentCheckin.belongsTo(Resident, { foreignKey: "residentId" });

ResidentCheckin.belongsTo(SecurityGuard, { foreignKey: "securityGuardId" });

ResidentCheckin.belongsTo(Vehicle, { foreignKey: "vehicleId" });

//* EXPORTS
module.exports = ResidentCheckin;
