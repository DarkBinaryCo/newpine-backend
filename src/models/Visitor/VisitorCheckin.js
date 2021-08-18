const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

// Model dependencies
const VisitorInvitation = require("./VisitorInvitation");
const { SecurityGuard } = require("../SecurityCompany");
const { Property } = require("../Property");

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
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment:
        "The id of the property group they are going to. Set here because guards may be re-assigned which may prevent us from being able to get accurate checkin data",
      references: {
        model: "properties", //? Table name
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
    modelName: "VisitorCheckin",
    tableName: "visitor_checkins",
    paranoid: true,
  }
);

//
VisitorCheckin.belongsTo(VisitorInvitation, {
  foreignKey: "visitorInvitationId",
});

VisitorCheckin.belongsTo(Property, { foreignKey: "propertyId" });

VisitorCheckin.belongsTo(SecurityGuard, { foreignKey: "securityGuardId" });

//* EXPORTS
module.exports = VisitorCheckin;
