"use strict";
const jwtService = require("../services/auth.services");
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
    return res.status(200).json({...token});
  },
};
