const db = require('../../database');
const {
    DataTypes
} = require('sequelize');

//* MODEL DEPENDENCIES
const {
    User
} = require('../User')

/** Attributes expected in the database */
const _authTokenAttributes = {
    //? Including this because sequelize only auto-detects primary keys called `id`
    token: {
        type: DataTypes.STRING(128),
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false
    },
    expiresOn: {
        type: DataTypes.DATE,
        allowNull: true
    }
}

/** Schema definition */
const AuthToken = db.define('auth_token', _authTokenAttributes);

//* RELATIONSHIPS
AuthToken.belongsTo(User, {
    foreignKey: 'userId'
});

//* EXPORTS
module.exports = AuthToken;