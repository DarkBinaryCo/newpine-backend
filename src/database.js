require("dotenv").config();

const Sequelize = require("sequelize");

//* Database setup
let sequelize;

console.debug("Environment: ", process.env.ENVIRONMENT);

//? When the database url is set it means we are on the server and have received a connection string as DATABASE_URL (typically heroku-postgres)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(`${process.env.DATABASE_URL}?sslmode=require`, {
    dialect: "postgres",
    protocol: "postgres",
    host: process.env.DB_HOST,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  //? This means we are building locally
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
