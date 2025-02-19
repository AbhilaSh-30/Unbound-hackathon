const pool = require("../config/db.js");

const applyRoutingPolicy = async (provider, model, prompt) => {
  try {
    const result = await pool.query("SELECT regex_pattern, redirect_model FROM routing_rules WHERE original_model = $1", [`${provider}/${model}`]);

    for (const row of result.rows) {
      const regex = new RegExp(row.regex_pattern, "i");
      if (regex.test(prompt)) {
        console.log(`Routing rule triggered: Redirecting '${model}' to '${row.redirect_model}'`);
        const [newProvider, newModel] = row.redirect_model.split("/");
        console.log(newProvider);
        return { provider: newProvider, model: newModel };
      }
    }

    return { provider, model };
  } catch (error) {
    console.error("Error applying routing policy:", error);
    return model;
  }
};

const getFileRoutingPolicy = async (fileType) => {
  try {
    const result = await pool.query(
      "SELECT redirect_provider, redirect_model FROM file_routing_rules WHERE file_type = $1",
      [fileType]
    );

    return result.rows.length ? result.rows[0] : null;
  } catch (error) {
    console.error("Error fetching file routing policy:", error);
    return null;
  }
};

module.exports = { applyRoutingPolicy, getFileRoutingPolicy };
