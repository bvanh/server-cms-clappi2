"use strict";

module.exports = function (app) {
  let logApi = require("./controls/LogController");
  let api = require("./controls/UserController");
  let token = require("./controls/TokenControler");
  app.route("/login").post(logApi.login);
  app.route("/token/renew").post(token.refreshToken);
  //users
  app.route("/users").get(token.verify, api.getUsers);
  app.route("/users/detail").get(token.verify, api.getDetailUser);
};
