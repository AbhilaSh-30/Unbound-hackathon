const express = require("express");
const { chatCompletion } = require("../controllers/chatController.js");
const upload = require("../middleware/upload.js");

const chatRouter = express.Router();

chatRouter.post("/v1/chat/completions", upload.single("file"), chatCompletion);

module.exports = chatRouter;