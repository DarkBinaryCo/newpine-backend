require("dotenv").config();

const Sequelize = require("sequelize");

//* Database setup
let sequelize;

// Local versions will use environment settings while production versions will use connection string ("more secure")
switch (process.env.ENVIRONMENT) {
  case "production":
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
    break;

  default:
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        dialect: process.env.DB_DIALECT,

        //? Show SQL logs in the console (useful for debugging)
        logging: false,
      }
    );
}

//* EXPORTS
module.exports = sequelize;
