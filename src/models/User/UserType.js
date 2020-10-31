const db = require('../../database');
const {
    DataTypes
} = require('sequelize');

const User = require('./User');

/** Attributes expected in the database */
const _userTypeAttributes = {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}

/** Schema definition */
const UserType = db.define('user_type', _userTypeAttributes);

//* RELATIONSHIPS
UserType.hasMany(User, {
    foreignKey: 'id'
});

//* EXPORTS
module.exports = UserType;