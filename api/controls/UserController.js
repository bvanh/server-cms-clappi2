"use strict";
const db = require("../services/db.services");
let users = {
  anhviet: "123123",
};
module.exports = {
  getUsers: (req, res, next) => {
    try {
      // let sql = "UPDATE fake_info SET currentMail = currentMail + 500";
      // db.query(sql, (err, response) => {
      //   if (err) {
      //     res.status(400).send(err);
      //   }
      //   console.log("add fake success");
      // });
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
};
