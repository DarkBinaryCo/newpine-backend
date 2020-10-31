const db = require('../../database');
const {
    DataTypes
} = require('sequelize');

/** Attributes expected in the database */
const _paymentAttributes = {
    userId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    confirmationCode: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.ENUM('mpesa', 'card'),
        allowNull: false,
        defaultValue: 'mpesa'
    },
    paymentType: {
        type: DataTypes.ENUM('servicePayment', 'providerPayout', 'serviceRefund'),
        allowNull: false,
        defaultValue: 'servicePayment'
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    dateConfirmed: {
        type: DataTypes.DATE,
        allowNull: true
    }
}

/** Schema definition */
const Payment = db.define('payment', _paymentAttributes);

//* EXPORTS
module.exports = Payment;