const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

//! TODO: Find way to use model aggregator to fetch this information
const { PropertyGroup } = require("../Property");
const { User } = require("../User");
const SecurityShift = require("./SecurityShift");

//
class SecurityGuard extends Model {}

// Schema definition
SecurityGuard.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users", //? Table name
        key: "id",
      },
      allowNull: false,
      comment: "The user account this security guard belongs to",
    },
    securityIdNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      comment: "The security company's identification number for this guard",
    },
    propertyGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: "property_groups", //? Table name
        key: "id",
      },
      allowNull: false,
      comment: "The property group/zone this guard is in charge of",
    },
    shiftId: {
      type: DataTypes.INTEGER,
      references: {
        model: "security_shifts",
        key: "id",
      },
      allowNull: false,
      defaultValue: 1,
    },
  },
  { sequelize, modelName: "SecurityGuard", tableName: "security_guards" }
);

// Relationships
SecurityGuard.belongsTo(User, { foreignKey: "userId" });
SecurityGuard.belongsTo(PropertyGroup, { foreignKey: "propertyGroupId" });
SecurityGuard.belongsTo(SecurityGuard, { foreignKey: "shiftId" });

//* EXPORTS
module.exports = SecurityGuard;
