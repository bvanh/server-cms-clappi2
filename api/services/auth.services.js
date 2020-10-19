const jwt = require("jsonwebtoken");
const {
  TOKEN_SECRET,
  TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE,
} = process.env;

const authService = {
  getRefreshToken: (payload) =>
    jwt.sign(payload, TOKEN_SECRET, {
      expiresIn: TOKEN_LIFE,
      algorithm: "HS256",
    }),
  getAccessToken: (payload) =>
    jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_LIFE,
      algorithm: "HS256",
    }),
  verifyToken: (tokenVerify, tokenSecret) =>
    jwt.verify(tokenVerify, tokenSecret),
};

module.exports = authService;
