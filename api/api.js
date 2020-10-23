require("dotenv").config();
let express = require("express");
let cors = require("cors");
let bodyparser = require("body-parser");
let routes = require("./routers");
let port = process.env.PORT;

//server config
const dbService = require("./services/db.services");
const evinronment = "test";
const DB = dbService(evinronment, false).start();
//
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
routes(app);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
app.listen(port, () => {
  return DB;
});

console.log("RESTful API server started on: " + port);
