var mongoDb = require("mongodb");

var db = new mongoDb.Db(
  "cadastro_clientes",
  new mongoDb.Server("localhost", 27017, {}),
  {}
);

db.insert = function(param) {
  console.log("inserting" + param);
};

module.exports = () => {
  return db;
};
