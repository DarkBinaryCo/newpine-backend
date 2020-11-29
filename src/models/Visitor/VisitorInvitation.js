const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

const { Resident } = require("../Resident");
const { IdentificationTypes } = require("../User");
//
class VisitorInvitation extends Model {}

// Schema definition
VisitorInvitation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    residentInviterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "residents",
        key: "id",
      },
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    identificationTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "identification_types", //? Table name
        key: "id",
      },
    },
    identificationNumber: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: false,
    },
    transportMeans: {
      type: DataTypes.ENUM,
      values: ["foot", "vehicle"],
      defaultValue: "vehicle",
      allowNull: false,
    },
    vehicleNumberplate: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
    },
    isAdult: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isActive: {
      // Can this invitation be used to check them in?
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VisitorInvitation",
    tableName: "visitor_invitations",
  }
);

// Relationships
VisitorInvitation.belongsTo(Resident, { foreignKey: "residentInviterId" });
VisitorInvitation.belongsTo(IdentificationTypes, {
  foreignKey: "identificationTypeId",
});

//* EXPORTS
module.exports = VisitorInvitation;