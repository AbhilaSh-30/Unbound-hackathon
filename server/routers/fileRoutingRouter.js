const express = require("express");
const {
  getFileRoutingRules,
  addFileRoutingRule,
  updateFileRoutingRule,
  deleteFileRoutingRule,
} = require("../controllers/fileRoutingController.js");

const fileRoutingRouter = express.Router();

fileRoutingRouter.get("/file-routing-rules", getFileRoutingRules);
fileRoutingRouter.post("/file-routing-rules", addFileRoutingRule);
fileRoutingRouter.put("/file-routing-rules/:id", updateFileRoutingRule);
fileRoutingRouter.delete("/file-routing-rules/:id", deleteFileRoutingRule);

module.exports = fileRoutingRouter;
