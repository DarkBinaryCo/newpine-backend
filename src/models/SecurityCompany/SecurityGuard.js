const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

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
    addedByUserId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      comment:
        "The user id of the security manager that added this security guard",
    },
  },
  { sequelize, modelName: "SecurityGuard", tableName: "security_guards" }
);

// Relationships
SecurityGuard.belongsTo(User, { foreignKey: "userId" });
SecurityGuard.belongsTo(PropertyGroup, { foreignKey: "propertyGroupId" });
SecurityGuard.belongsTo(SecurityShift, { foreignKey: "shiftId" });
SecurityGuard.belongsTo(User, {
  as: "AddedByUser",
  foreignKey: "addedByUserId",
});

//* EXPORTS
module.exports = SecurityGuard;
