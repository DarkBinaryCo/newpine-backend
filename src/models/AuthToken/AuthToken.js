const db = require("../../database");
const { DataTypes } = require("sequelize");

//* Utils
const { hash } = require("../../utils/auth");

//* MODEL DEPENDENCIES
const { User } = require("../User");

/** Attributes expected in the database */
const _authTokenAttributes = {
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
};

/** Schema definition */
const AuthToken = db.define("auth_token", _authTokenAttributes);

//* RELATIONSHIPS
// AuthToken.belongsTo(User, {
//     foreignKey: 'userId'
// });

//* EXPORTS
module.exports = AuthToken;
