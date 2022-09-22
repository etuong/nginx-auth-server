/**
 * Can be customized to define authorization such as custom back end database.
 * Right now I am just checking for a single password
 */

const dotenv = require("dotenv");
dotenv.config();

const authPassword = process.env.AUTH_PASSWORD;

const checkAuth = (user, pass) => {
  if (!authPassword) {
    console.error("Environment variable AUTH_PASSWORD is not found");
    process.exit(1);
  }

  return pass === authPassword;
};

module.exports = checkAuth;
