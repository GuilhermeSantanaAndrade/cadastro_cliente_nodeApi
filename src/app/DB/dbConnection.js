// MONGO IMPORTS
var mongoDb = require("mongodb").MongoClient,
  ObjectId = require("mongodb").ObjectID();
var mysql = require("mysql");

// MYSQL IMPORTS

// SQLITE IMPORTS

// SQLSERVER IMPORTS

// FIREBIRD IMPORTS

// *** DataBase Class ***

function Db() {
  this._db = undefined;
  this._dbType = "";
}

Db.prototype.connect = async function(dbType, dbName, port = 27017) {
  try {
    this._dbType = dbType;
    switch (this._dbType.toUpperCase()) {
      case "MONGODB": {
        await mongoDb
          .connect(`mongodb://localhost:${port}/${dbName}`, {
            useUnifiedTopology: true
          })
          .then(db => {
            this._db = db;
          });
        break;
      }
      case "MYSQL": {
        let db = await mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: dbName
        });

        this._db = db;
        break;
      }
      default: {
        throw `Banco de dados não implementado "${this._dbType}"`;
      }
    }

    return Promise.resolve(this);
  } catch (err) {
    throw `Conexão ao banco de dados falhou. Erro: ${err}`;
  }
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
  switch (this._dbType.toUpperCase()) {
    case "MONGODB": {
      if (this._db) {
        this._db.close();
      }
      break;
    }
    case "MYSQL": {
      if (this._db) {
        this._db.end();
      }
      break;
    }
    default: {
      Promise.reject(`Banco de dados não implementado "${this._dbType}"`);
      break;
    }
  }
};

module.exports = Db;
