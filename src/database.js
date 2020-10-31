const Sequelize = require("sequelize");
const {
    DB_NAME,
    DB_HOST,
    DB_PASSWORD,
    DB_DIALECT
} = require('./config/database');

//* Database setup
const db = new Sequelize(DB_NAME, DB_HOST, DB_PASSWORD, {
    dialect: DB_DIALECT
});

//* EXPORTS
module.exports = db;