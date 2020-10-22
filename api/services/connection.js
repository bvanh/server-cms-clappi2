const testing = {
  main: {
    database: process.env.DB_NAME_MAIN_TEST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
  duo: {
    database: process.env.DB_NAME_DUO_TEST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
  log: {
    database: process.env.DB_NAME_LOG_TEST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
  logcash: {
    database: process.env.DB_NAME_LOG_CASH_TEST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
};

const production = {
  main: {
    database: process.env.DB_NAME_MAIN_PROD,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
  duo: {
    database: process.env.DB_NAME_DUO_PROD,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
  log: {
    database: process.env.DB_NAME_LOG_PROD,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
  logcash: {
    database: process.env.DB_NAME_LOG_CASH_PROD,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    timezone: "+07:00",
  },
};

module.exports = {
  testing,
  production,
};
