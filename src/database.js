const Sequelize = require("sequelize");
const DbConfig = require("./config/database");

//* Database setup
let sequelize;

// Local versions will use environment settings while production versions will use connection string ("more secure")
switch (process.env.ENVIRONMENT) {
  case "production":
    sequelize = new Sequelize(process.env.DATABASE_URL);
    break;

  default:
    sequelize = new Sequelize(
      DbConfig.database,
      DbConfig.username,
      DbConfig.password,
      {
        dialect: DbConfig.dialect,

        //? Show SQL logs in the console (useful for debugging)
        logging: false,
      }
    );
}

//* EXPORTS
module.exports = sequelize;
