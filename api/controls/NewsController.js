"use strict";
const sequelize = require("sequelize");
const News = require("../models/News");
const attributesNews = [
  "news_id",
  "type",
  "subject",
  "content",
  "status",
  "create_at",
  "platform",
];
const typeSearch = {
  1: "subject",
};
const getPagingData = (data, page, limit) => {
  //console.log(data)
  const { count: totalItems, rows: listNews } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, listNews };
};
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
module.exports = {
  getNews: async (req, res, next) => {
    //console.log(req)
    const { page, search, type, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    News.findAndCountAll({
      attributes: attributesNews,
      where: {
        search: sequelize.where(
          sequelize.fn("LOWER", sequelize.col(typeSearch[type])),
          "LIKE",
          "%" + search + "%"
        ),
      },
      limit: limit,
      offset: offset,
    })
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },
  getDetailNews: async (req, res, next) => {
    const { userId } = req.query;
    News.findOne({
      attributes: attributesNews,
      where: {
        fake_id: userId,
      },
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },
};
