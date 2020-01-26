// MONGO IMPORTS
var mongoDb = require("mongodb").MongoClient,
  objectId = require("mongodb").ObjectID;

// MYSQL IMPORTS
var mysql = require("mysql");

// SQLITE IMPORTS

// SQLSERVER IMPORTS

// FIREBIRD IMPORTS

// *** DataBase Class ***

function Db() {
  this._db = undefined;
  this._dbType = "";
  this._dbName = "";
}

Db.prototype.isConnected = async function() {
  return this._db !== undefined;
};

Db.prototype.connect = async function(dbType, dbName, port = 27017) {
  try {
    this._dbType = dbType;
    this._dbName = dbName;

    switch (this._dbType.toUpperCase()) {
      case "MONGODB": {
        await mongoDb
          .connect(`mongodb://localhost:${port}`, {
            useUnifiedTopology: true
          })
          .then(db => {
            // cairá aqui apenas se conectou com sucesso
            this._db = db;
          });
        break;
      }
      case "MYSQL": {
        let db = await mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: this._dbName
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

Db.prototype.insert = async function(collectionName, value) {
  if (!this.isConnected()) return Promise.reject();

  switch (this._dbType.toUpperCase()) {
    case "MONGODB": {
      if (!this.isConnected()) return Promise.reject();
      const dbo = this._db.db(this._dbName);
      const response = await dbo.collection(collectionName).insertOne(value);
      return { ...response.result, _id: objectId(response.insertedId.id) };
    }
    default:
      return Promise.reject();
  }
};

Db.prototype.update = async function(collectionName, value) {
  console.log("update");
};

Db.prototype.delete = async function(collectionName, value) {
  console.log("delete");
};

Db.prototype.find = async function(collectionName, where, fields) {
  if (!this.isConnected()) return Promise.reject();

  switch (this._dbType.toUpperCase()) {
    case "MONGODB": {
      let projection = fields;
      if (fields) {
        projection = { projection: fields };
      }

      const dbo = this._db.db(this._dbName);
      const response = await dbo
        .collection(collectionName)
        .find(where, projection)
        .toArray();
      return response;
    }
    default: {
      return Promise.reject();
    }
  }
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
