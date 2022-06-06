require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { router } = require("./routes/index");
const bodyParser = require("body-parser");

const app = express(); // inicializador das rotas e do servidor

app.use(bodyParser.json()); // middleware de conversão de dados vindos das requisições
app.use(cors());
router(app);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
);

module.exports = app;
