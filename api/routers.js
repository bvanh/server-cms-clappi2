"use strict";
let logApi = require("./controls/LogController");
let token = require("./controls/TokenControler");
let apiUser = require("./controls/UserController");
let apiNews = require("./controls/NewsController");
module.exports = function (app) {
  app.route("/login").post(logApi.login);
  app.route("/token/renew").post(token.refreshToken);
  //users
  app.route("/users").get(token.verify, apiUser.getUsers);
  app.route("/users/detail").get(token.verify, apiUser.getDetailUser);
  //news
  app.route("/news").get(token.verify, apiNews.getNews);
};
