require("dotenv").config();
let express = require("express");
let cors = require("cors");
let bodyparser = require("body-parser");
let routes = require("./routers");
let port = process.env.PORT;
// let cronjob = require("./api/cronmail");
// let port = process.env.PORT || 5005;
// const PORT_REDIS = 6379;
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
routes(app);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
app.listen(port);

console.log("RESTful API server started on: " + port);
