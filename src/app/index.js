var express = require("express"),
  bodyParser = require("body-parser"),
  multiparty = require("connect-multiparty"),
  consign = require("consign"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

consign()
  .include("./src/app/routes")
  .into(app);

module.exports = app;
