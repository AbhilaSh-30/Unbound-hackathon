const pool = require("../config/db.js");

const getModels = async (req, res) => {
    try {
      const result = await pool.query("SELECT name FROM models");
      res.json(result.rows.map((row) => row.name));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};
  
module.exports = { getModels };