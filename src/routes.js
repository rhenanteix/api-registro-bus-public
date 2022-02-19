const express = require("express");

const BusController = require("./controllers/BusController");

const routes = express.Router();

routes.get("/", function (_req, res) {
  res.send("Bem vindo a api de horário de onibus em registro");
});

routes.post("/register-bus/", BusController.register);
// PARTNERS FUNCTIONS




module.exports = routes;
