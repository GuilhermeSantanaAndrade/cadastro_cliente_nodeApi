var ControllerCliente = require("../controllers/cliente"),
  asyncHandler = require("express-async-handler");

module.exports = app => {
  // GET
  app.get("/api/cliente/:id?", async (req, res) => {
    try {
      await ControllerCliente.consultar(req, res);
    } catch (err) {
      res.status("500").json({ status: 500, message: err.message || err });
    }
  });

  // POST
  app.post("/api/cliente", async (req, res) => {
    try {
      await ControllerCliente.incluir(req, res);
    } catch (err) {
      res.status("500").json({ status: 500, message: err.message || err });
    }
  });

  // PUT
  app.put("/api/cliente/:id", async (req, res) => {
    try {
      await ControllerCliente.alterar(req, res);
    } catch (err) {
      res.status("500").json({ status: 500, message: err.message || err });
    }
  });

  // DELETE
  app.delete("/api/cliente/:id", async (req, res) => {
    try {
      await ControllerCliente.deletar(req, res);
    } catch (err) {
      res.status("500").json({ status: 500, message: err.message || err });
    }
  });
};
