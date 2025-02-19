const pool = require("../config/db.js");
const openaiProvider = require("../providers/openaiProvider.js");
const anthropicProvider = require("../providers/anthropicProvider.js");
const geminiProvider = require("../providers/geminiProvider.js");
const { applyRoutingPolicy } = require("../middleware/routingPolicy");

const chatCompletion = async (req, res) => {
  let { provider, model, prompt } = req.body;

  if (!provider || !model || !prompt) {
    return res.status(400).json({
      error:
        "Missing fields ! All fields are required - provider, model, prompt",
    });
  }

  try {
    ({ redirectedProvider, redirectedModel } = await applyRoutingPolicy(provider, model, prompt));
    if (redirectedModel !== model) {
      console.log(`Request rerouted from ${model} to ${redirectedProvider}/${redirectedModel}`);
      model = redirectedModel;
      provider = redirectedProvider;
    }

    const result = await pool.query("SELECT name FROM models WHERE name = $1", [
      `${provider}/${model}`,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid provider or model" });
    }
    
    let response;
    switch (provider) {
      case "openai":
        response = openaiProvider(model, prompt);
        break;
      case "anthropic":
        response = anthropicProvider(model, prompt);
        break;
      case "gemini":
        console.log("gemini");
        response = geminiProvider(model, prompt);
        break;
      default:
        return res.status(400).json({ error: "Provider not supported" });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { chatCompletion };
