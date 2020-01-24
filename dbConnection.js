// MONGO IMPORTS
var mongoDb = require("mongodb").MongoClient,
  ObjectId = require("mongodb").ObjectID();

// MYSQL IMPORTS

// SQLITE IMPORTS

// SQLSERVER IMPORTS

// FIREBIRD IMPORTS

// *** DataBase Class ***

function Db() {
  this._db = undefined;
}

Db.prototype.connect = async function(dbType, dbName, port = 27017) {
  switch (dbType.toUpperCase()) {
    case "MONGODB": {
      await mongoDb
        .connect(`mongodb://localhost:${port}/${dbName}`, {
          useUnifiedTopology: true
        })
        .then(db => {
          console.log("MongoDb carregado...");
          this._db = db;
        });
      break;
    }
    default: {
      Promise.reject(`Banco de dados não implementado "${dbType}"`);
      break;
    }
  }

  return this;
};

Db.prototype.insert = async function(param) {
  console.log("insert");
};

Db.prototype.update = async function(param) {
  console.log("update");
};

Db.prototype.delete = async function(param) {
  console.log("delete");
};

Db.prototype.find = async function(param) {
  console.log("find");
};

Db.prototype.close = async function() {
  if (this._db) {
    this._db.close();
  }
};

module.exports = Db;
