"use strict";
const database = require("./databases");
const dbService = (environment, migrate) => {
  const authenticateDb = (db) => db.authenticate();
  //const dropDb = (db) => db.drop();
  // const syncDb = (db) => db.sync();
  const successfulDBStart = (db) =>
    console.info(
      `connection to the database ${db.options.database} has been established successfully`
    );

  const errorDBStart = (err) =>
    console.info("unable to connect to the database:", err);

  const wrongEnvironment = () => {
    console.warn(
      `only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`
    );
    return process.exit(1);
  };
  const startMigrateTrue = async () => {
    try {
      // await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async (db) => {
    try {
      // await dropDb(db);
      // await syncDb(db);
      successfulDBStart(db);
    } catch (err) {
      errorDBStart(err);
    }
  };
  const startTest = async () => {
    let databases = Object.values(database);
    databases.map(async (val) => {
      try {
        await authenticateDb(val);
        await startMigrateFalse(val);
      } catch (err) {
        errorDBStart(err);
      }
    });
  };
  const startProd = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };
  const start = async () => {
    switch (environment) {
      case "test":
        await startTest();
        break;
      case "prod":
        await startProd();
      default:
        await wrongEnvironment();
        break;
    }
  };
  return {
    start,
  };
};

module.exports = dbService;
