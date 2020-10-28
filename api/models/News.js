const Squelize = require("sequelize");
const squelize = require("../services/databases");

const News = squelize.main.define(
  "News",
  {
    news_id: Squelize.INTEGER,
  },
  { tableName: "news" }
);

module.exports = News;
