const pool = require("../config/db.js");

const getFileRoutingRules = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM file_routing_rules");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching file routing rules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFileRoutingRule = async (req, res) => {
  const { file_type, redirect_provider, redirect_model } = req.body;

  if (!file_type || !redirect_provider || !redirect_model) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await pool.query(
      "INSERT INTO file_routing_rules (file_type, redirect_provider, redirect_model) VALUES ($1, $2, $3)",
      [file_type, redirect_provider, redirect_model]
    );
    res.status(201).json({ message: "File routing rule added successfully" });
  } catch (error) {
    console.error("Error adding file routing rule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateFileRoutingRule = async (req, res) => {
  const { id } = req.params;
  const { file_type, redirect_provider, redirect_model } = req.body;

  try {
    await pool.query(
      "UPDATE file_routing_rules SET file_type = $1, redirect_provider = $2, redirect_model = $3 WHERE id = $4",
      [file_type, redirect_provider, redirect_model, id]
    );
    res.json({ message: "File routing rule updated successfully" });
  } catch (error) {
    console.error("Error updating file routing rule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFileRoutingRule = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM file_routing_rules WHERE id = $1", [id]);
    res.json({ message: "File routing rule deleted successfully" });
  } catch (error) {
    console.error("Error deleting file routing rule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFileRoutingRules,
  addFileRoutingRule,
  updateFileRoutingRule,
  deleteFileRoutingRule,
};
