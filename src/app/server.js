var app = require("./config.js");
require("dotenv").config({
  path: ".env"
});

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ON Porta(${port})`);
});
