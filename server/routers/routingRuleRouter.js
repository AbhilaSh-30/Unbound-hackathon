const express = require("express");
const {
    getRoutingRules,
    addRoutingRule,
    updateRoutingRule,
    deleteRoutingRule
} = require("../controllers/routingRuleController.js");

const routingRuleRouter = express.Router();

routingRuleRouter.get("/routing-rules", getRoutingRules);
routingRuleRouter.post("/routing-rules", addRoutingRule);
routingRuleRouter.put("/routing-rules/:id", updateRoutingRule);
routingRuleRouter.delete("routing-rules/:id", deleteRoutingRule);

module.exports = routingRuleRouter;