var Db = require("../DB/dbConnection");

class ClienteController {
  consultar = async (req, res) => {
    let database = undefined;
    try {
      database = await new Db().connect("mongodb", "cadastro_clientes");
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message || err });
      return;
    }

    try {
      res.status(200).json({ status: 200, message: "resposta" });
    } finally {
      database.close();
    }
  };
}

module.exports = new ClienteController();
