"use strict";
const jwtService = require("../services/auth.services");
const { getAccessToken, getRefreshToken, verifyToken } = jwtService;
const { ACCESS_TOKEN_SECRET, TOKEN_SECRET, ACCESS_TOKEN_LIFE } = process.env;
module.exports = {
  verify: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    // console.log(accessToken, authHeader);
    if (accessToken === null)
      return res.status(403).json({
        msg: "Invalid Token!",
      });
    try {
      verifyToken(accessToken, ACCESS_TOKEN_SECRET);
      // console.log(verifyToken(accessToken, ACCESS_TOKEN_SECRET))
      next();
    } catch (e) {
      return res.status(401).json({
        msg: "Token expired!",
      });
    }
  },
  refreshToken: (req, res, next) => {
    const { refreshToken } = req.body;
    let user;
    try {
      user = verifyToken(refreshToken, TOKEN_SECRET);
    } catch (e) {
      return res.status(401).json({ msg: "Invalid Token!" });
    }
    let accessToken = getAccessToken({ username: user.username });
    return res.status(200).json({ accessToken: accessToken });
  },
};
