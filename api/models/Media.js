const Squelize = require("sequelize");
const squelize = require("../services/databases");

const Media = squelize.main.define(
  "media",
  {
    id: {
      primaryKey: true,
      type: Squelize.INTEGER,
    },
    name: Squelize.STRING,
    size: Squelize.NUMBER,
    url: Squelize.STRING,
    type: Squelize.STRING,
    public_id: Squelize.STRING,
  },
  { tableName: "media", timestamps: false }
);

module.exports = Media;
