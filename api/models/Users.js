const Squelize = require("sequelize");
const squelize = require("../services/databases");

const User = squelize.main.define(
  "Users",
  {
    user_id: Squelize.CHAR,
  },
  { tableName: "users" }
);

module.exports = User;
