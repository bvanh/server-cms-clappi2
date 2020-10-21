"use strict";
const jwtService = require("../services/auth.services");
const db = require("../services/db.services");
let users = {
  anhviet: "123123",
};
const { getAccessToken, getRefreshToken, verifyToken } = jwtService;
module.exports = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password || users[username] !== password) {
      return res.status(400).json({ msg: "Bad Request: User not found" });
    }
    const token = {
      refreshToken: getRefreshToken({ username: username }),
      accessToken: getAccessToken({ username: username }),
    };
    return res.status(200).json({ token });
  },
  getUsers: (req, res, next) => {
    try {
      let sql = "UPDATE fake_info SET currentMail = currentMail + 500";
      db.query(sql, (err, response) => {
        if (err) {
          res.status(400).send(err);
        }
        console.log("add fake success");
      });
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
};
