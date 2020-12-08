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
    isCheckin: {
      //? Used as such to prevent complications of trying to figure out whether we should update an existing checkin or create a new checkin/checkout
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "If true, it was a checkin; if false, it was a checkout",
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
