require("dotenv").config();
const connectToDatabase = require("./database/connect");
const express = require("express");
const app = express();
const routes = require("./routes/router");
app.use(express.json());
app.use(routes);

const port = process.env.PORT;

connectToDatabase()
  .then((x) => {
    app.listen(port, () =>
      console.log("Servidor rodando e banco de dados conectados", port)
    );
  })
  .catch((err) => {
    console.error("Erro ao conectar com o MongoDB:", err);
  });
