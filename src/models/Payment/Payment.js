const sequelize = require("../../database");
const { DataTypes, Model, Sequelize } = require("sequelize");

//
class Payment extends Model {}

// Schema definition
Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    confirmationCode: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM("mpesa", "card"),
      allowNull: false,
      defaultValue: "mpesa",
    },
    paymentType: {
      type: DataTypes.ENUM("servicePayment", "providerPayout", "serviceRefund"),
      allowNull: false,
      defaultValue: "servicePayment",
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateConfirmed: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "Payment" }
);

//* EXPORTS
module.exports = Payment;
