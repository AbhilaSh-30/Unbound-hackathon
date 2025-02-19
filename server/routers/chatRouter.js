const express = require("express");
const { chatCompletion } = require("../controllers/chatController.js");

const chatRouter = express.Router();

chatRouter.post("/v1/chat/completions", chatCompletion);

module.exports = chatRouter;