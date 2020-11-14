const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

//* Utils
const { AuthUtil } = require("../../utils");

//
class AuthToken extends Model {}

// Schema definition
AuthToken.init(
  {
    //? Including this because sequelize only auto-detects primary keys called `id`
    token: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      set(value) {
        this.setDataValue("token", AuthUtil.hash(value));
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", //? Table name
        key: "id",
      },
    },
    expiresOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "AuthToken", tableName: "auth_tokens" }
);

//* EXPORTS
module.exports = AuthToken;
