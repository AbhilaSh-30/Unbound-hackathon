const express = require("express");
const { register, login, logout } = require("../controllers/authController.js");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware.js");
const { validateRegister, validateLogin } = require("../middleware/validators.js");

const authRouter = express.Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, login);
authRouter.post("/logout", authenticateUser, logout);

authRouter.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

module.exports = authRouter;
