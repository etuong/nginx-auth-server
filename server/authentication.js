/**
 * Can be customized to define authorization such as custom back end database.
 * Right now I am just checking for a single password
 */

const dotenv = require("dotenv");
dotenv.config();

const authUser = process.env.AUTH_USER;
const authPassword = process.env.AUTH_PASSWORD;

const checkAuth = (user, password) => {
  if (!authUser) {
    console.error("Environment variable AUTH_USER is not found");
    process.exit(1);
  }

  if (!authPassword) {
    console.error("Environment variable AUTH_PASSWORD is not found");
    process.exit(1);
  }

  return user === authUser && password === authPassword;
};

module.exports = checkAuth;
