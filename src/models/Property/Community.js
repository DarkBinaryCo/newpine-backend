const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

class Community extends Model {}

// Schema definition
Community.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    host: {
      type: DataTypes.STRING(50),
      allowNull: true,
      default: null,
      comment:
        "The name of the host of this community for example: nyayo.estate",
    },
    type: {
      type: DataTypes.ENUM,
      defaultValue: "residential",
      values: ["residential", "commercial"],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: null,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
      default: null,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      default: null,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      default: null,
    },
  },
  { sequelize, modelName: "Community", tableName: "communities" }
);

//* EXPORTS
module.exports = Community;
