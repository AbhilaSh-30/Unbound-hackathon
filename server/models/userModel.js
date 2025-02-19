const { Pool } = require("pg");
const pool = require("../config/db.js");

const createUser = async (username, email, passwordHash, roles) => {
    const result = await pool.query(
        "INSERT INTO users (username, email, password_hash, roles) VALUES ($1, $2, $3, $4) RETURNING id, username, email, roles",
        [username, email, passwordHash, roles]
    );
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
