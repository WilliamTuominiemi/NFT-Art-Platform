const dotenv = require("dotenv");

dotenv.config();

const PORT = Number(process.env.PORT) || 8080;

const IS_PROD = process.env.NODE_ENV === "production";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

module.exports = {
  PORT,
  IS_PROD,
  ONE_DAY_IN_MS,
};
