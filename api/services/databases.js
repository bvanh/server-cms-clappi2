const Sequelize = require("sequelize");
const connection = require("./connection");

// let database;
const db = {};
let databases = null;
switch (process.env.NODE_ENV) {
  case "production":
    databases = Object.keys(connection.production);
    for (let i = 0; i < databases.length; i += 1) {
      const database = databases[i];
      const dbPath = connection.production[database];
      db[database] = new Sequelize(
        dbPath.database,
        dbPath.username,
        dbPath.password,
        dbPath
      );
    }
    break;
  default:
    databases = Object.keys(connection.testing);
    for (let i = 0; i < databases.length; i += 1) {
      const database = databases[i];
      const dbPath = connection.testing[database];
      db[database] = new Sequelize(
        dbPath.database,
        dbPath.username,
        dbPath.password,
        dbPath
      );
    }
    break;
}

module.exports = db;
