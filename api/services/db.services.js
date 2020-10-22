"use strict";
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_WD,
  database: process.env.DB_NAME,
  port: 3306,
});
db.connect((err) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
      return;
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
      return;
    }
    if (err.code === "ECONNREFUSED") {
      console.error(err.message, "Database connection was refused.");
      return;
    }
  }
  console.log("db is connect!");
});

module.exports = db;
