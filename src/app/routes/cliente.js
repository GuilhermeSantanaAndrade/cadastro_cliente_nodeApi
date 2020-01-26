var ControllerCliente = require("../controllers/cliente");

module.exports = app => {
  // GET
  app.get("/api/cliente/:id?", async (req, res) => {
    ControllerCliente.consultar(req, res);
  });

  // POST
  app.post("/api/cliente", (req, res) => {
    res.status(200).json({ message: "resposta" });
  });

  // PUT
  app.put("/api/cliente/:id", (req, res) => {
    res.status(200).json({ message: "resposta" });
  });

  // DELETE
  app.delete("/api/cliente/:id", (req, res) => {
    res.status(200).json({ message: "resposta" });
  });
};
