"use strict";

module.exports = function (app) {
  let api = require("./controls/UserController");
  let token = require("./controls/TokenControler");
  app.route("/login").post(api.login);
  app.route("/users").get(token.verify, api.getUsers);
  app.route("/token/renew").post(token.refreshToken);
};
