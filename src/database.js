require("dotenv").config();

const Sequelize = require("sequelize");

//* Database setup
let sequelize;

console.debug("Environment: ", process.env.ENVIRONMENT);

// Local versions will use environment settings while production versions will use connection string ("more secure")
switch (process.env.ENVIRONMENT) {
  case "production":
    console.debug("Database url: ", process.env.DATABASE_URL, "\n");

    sequelize = new Sequelize(`${process.env.DATABASE_URL}?sslmode=require`, {
      dialect: "postgres",
      protocol: "postgres",
      native: true,
      host: process.env.DB_HOST,
      dialectOptions: {
        ssl: {
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
