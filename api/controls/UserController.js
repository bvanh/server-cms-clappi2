"use strict";
const db = require("../services/db.services");
const sequelize = require("sequelize");
const Users = require("../models/Users");
const attributesUser = ["fake_id", "username", "status", "email", "mobile"];
const typeSearch = {
  1: "username",
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: listUsers } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, listUsers, totalPages, currentPage };
};
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
module.exports = {
  getUsers: async (req, res, next) => {
    const { page, search, type, size } = req.body;
    const { limit, offset } = getPagination(page, size);
    Users.findAndCountAll({
      attributes: attributesUser,
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
};
