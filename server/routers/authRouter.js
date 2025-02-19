const express = require("express");
const { register, login, logout } = require("../controllers/authController.js");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authenticateUser, logout);

authRouter.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

module.exports = authRouter;
