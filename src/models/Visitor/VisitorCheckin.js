const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Model dependencies
const VisitorInvitation = require("./VisitorInvitation");
const { SecurityGuard } = require("../SecurityCompany");

class VisitorCheckin extends Model {}

// Schema definition
VisitorCheckin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    visitorInvitationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "visitor_invitations", //? Table name
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
    modelName: "VisitorCheckin",
    tableName: "visitor_checkins",
    paranoid: true,
  }
);

//
VisitorCheckin.belongsTo(VisitorInvitation, {
  foreignKey: "visitorInvitationId",
});
VisitorCheckin.belongsTo(SecurityGuard, { foreignKey: "securityGuardId" });

//* EXPORTS
module.exports = VisitorCheckin;
