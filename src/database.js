const Sequelize = require("sequelize");
const DbConfig = require("./config/database");

//* Database setup
const sequelize = new Sequelize(
  DbConfig.database,
  DbConfig.username,
  DbConfig.password,
  {
    dialect: DbConfig.dialect,

    //? Show SQL logs in the console (useful for debugging)
    logging: false,
  }
);

//* EXPORTS
module.exports = sequelize;
