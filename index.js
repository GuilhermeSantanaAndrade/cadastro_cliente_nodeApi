var express = require("express"),
  bodyParser = require("body-parser"),
  Db = require("./dbConnection"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(3000, () => {
  console.log("Servidor ON");
});

// GET
app.get("/api/cliente/:id?", async (req, res) => {
  const database = await new Db().connect("mongodb", "cadastro_clientes");
  try {
    res.status(200).json({ message: "resposta" });
  } finally {
    database.close();
  }
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
