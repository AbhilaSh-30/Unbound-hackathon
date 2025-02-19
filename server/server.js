const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const modelRouter = require("./routers/modelRouter.js");
const chatRouter = require("./routers/chatRouter.js");
const routingRulesRouter = require("./routers/routingRuleRouter.js");
const fileRoutingRouter = require("./routers/fileRoutingRouter.js");
const authRouter = require("./routers/authRouter.js");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { message: "Too many requests, please try again later." }
});

app.use("/api",modelRouter);
app.use("/api",chatRouter);
app.use("/api",routingRulesRouter);
app.use("/api",fileRoutingRouter);
app.use("/auth", limiter, authRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})