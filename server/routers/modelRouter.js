const express = require("express");
const { getModels } = require("../controllers/modelController.js");

const modelRouter = express.Router();

modelRouter.get("/models",getModels);

module.exports = modelRouter;