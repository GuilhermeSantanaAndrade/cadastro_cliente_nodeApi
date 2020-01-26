var Db = require("../DB/dbConnection"),
  objectId = require("mongodb").ObjectID;

class ClienteController {
  consultar = async (req, res) => {
    let database = undefined;
    try {
      database = await new Db().connect("mongodb", "cadastro_clientes");
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message || err });
      return;
    }

    const _id = req.params.id;
    let where = undefined;
    if (_id) {
      where = { _id: objectId(_id) };
    }

    try {
      const response = await database.find("clientes", where, undefined);
      res.status(200).json({ status: 200, message: "OK", data: response });
    } finally {
      database.close();
    }
  };

  incluir = async (req, res) => {
    let database = undefined;
    try {
      database = await new Db().connect("mongodb", "cadastro_clientes");
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message || err });
      return;
    }

    let body = req.body;

    try {
      const response = await database.insert("clientes", body);
      res.status(200).json({ status: 200, message: "OK", data: response });
    } finally {
      database.close();
    }
  };
}

module.exports = new ClienteController();
