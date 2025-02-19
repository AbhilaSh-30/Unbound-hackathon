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
const allowedOrigins = ["http://localhost:5173"]; 

const app = express();
app.use(cors({origin: allowedOrigins,credentials:true}));
app.use(cookieParser());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { message: "Too many requests, please try again later." }
});

const apiRouter = express.Router();
apiRouter.use(modelRouter);
apiRouter.use(chatRouter);
apiRouter.use(routingRulesRouter);
apiRouter.use(fileRoutingRouter);

app.use("/api",apiRouter);
app.use("/auth", limiter, authRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})