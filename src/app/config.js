var express = require("express"),
  bodyParser = require("body-parser"),
  multiparty = require("connect-multiparty"),
  consign = require("consign"),
  expressValidator = require("express-validator"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());
//app.use(expressValidator()); /* A última versão do expressValidator está com erro */
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

// trata URLs inválidas (404)
app.use(function(req, res, next) {
  res.status("404").json({ status: 404, message: "URL não encontrada." });
  next();
});

// trata erros internos para não travar a aplicação (500)
app.use(function errorHandler(err, req, res, next) {
  res.status("500").json({ status: 500, message: err });
  next();
});

module.exports = app;
