const sequelize = require("../../database");
const { DataTypes, Model } = require("sequelize");

//* Utils
const { hash } = require("../../utils/auth");

//* MODEL DEPENDENCIES
const { User } = require("../User");

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
        this.setDataValue("token", hash(value));
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expiresOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "AuthToken" }
);

//* RELATIONSHIPS
// AuthToken.belongsTo(User, {
//     foreignKey: 'userId'
// });

//* EXPORTS
module.exports = AuthToken;
