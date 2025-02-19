const express = require("express");
const cors = require("cors");
require("dotenv").config();

const modelRouter = require("./routers/modelRouter.js");
const chatRouter = require("./routers/chatRouter.js");
const routingRulesRouter = require("./routers/routingRuleRouter.js");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",modelRouter);
app.use("/api",chatRouter);
app.use("/api",routingRulesRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})