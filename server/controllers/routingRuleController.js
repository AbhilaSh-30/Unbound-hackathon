const pool = require("../config/db.js");

const getRoutingRules = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM routing_rules");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching routing rules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addRoutingRule = async (req, res) => {
  const { original_model, regex_pattern, redirect_model } = req.body;

  if (!original_model || !regex_pattern || !redirect_model) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await pool.query(
      "INSERT INTO routing_rules (original_model, regex_pattern, redirect_model) VALUES ($1, $2, $3)",
      [original_model, regex_pattern, redirect_model]
    );
    res.status(201).json({ message: "Rule added successfully" });
  } catch (error) {
    console.error("Error adding routing rule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRoutingRule = async (req, res) => {
  const { id } = req.params;
  const { original_model, regex_pattern, redirect_model } = req.body;

  try {
    await pool.query(
      "UPDATE routing_rules SET original_model = $1, regex_pattern = $2, redirect_model = $3 WHERE id = $4",
      [original_model, regex_pattern, redirect_model, id]
    );
    res.json({ message: "Rule updated successfully" });
  } catch (error) {
    console.error("Error updating routing rule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRoutingRule = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM routing_rules WHERE id = $1", [id]);
    res.json({ message: "Rule deleted successfully" });
  } catch (error) {
    console.error("Error deleting routing rule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRoutingRules,
  addRoutingRule,
  updateRoutingRule,
  deleteRoutingRule,
};
