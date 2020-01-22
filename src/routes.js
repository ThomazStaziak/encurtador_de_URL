const express = require("express");

const shorterController = require("./app/controllers/shorterController");

const routes = express.Router();

routes.post("/create/url", shorterController.createURL);
routes.post("/create/custom/url", shorterController.createCustomURL);
routes.get("/:url?", shorterController.checkURL);

module.exports = routes;
