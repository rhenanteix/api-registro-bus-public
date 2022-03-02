const express = require("express");

const BusController = require("./controllers/BusController");

const routes = express.Router();

routes.get("/", function (_req, res) {
  res.send("Bem vindo a api de horário de onibus em registro");
});

routes.post("/register-bus/", BusController.register);
routes.post("/register-company-registro", BusController.registerEmpresasRegistroSP);
routes.post("/register-attractions", BusController.registerAttractions);
routes.post("/register-vagas", BusController.registerVagas);

// PARTNERS FUNCTIONS




module.exports = routes;
