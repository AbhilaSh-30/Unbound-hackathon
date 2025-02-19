const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel.js");

const loginAttempts = {};

const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, email, hashedPassword, role || "normal");

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (loginAttempts[email] && loginAttempts[email].attempts >= 3) {
            const lastAttempt = loginAttempts[email].timestamp;
            const timeElapsed = (Date.now() - lastAttempt) / (1000 * 60);

            if (timeElapsed < 30) {
                return res.status(429).json({ message: "Too many failed attempts. Try again after 30 minutes." });
            } else {
                delete loginAttempts[email];
            }
        }

        const user = await findUserByEmail(email);
        if (!user) {
            trackFailedAttempt(email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            trackFailedAttempt(email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        delete loginAttempts[email];

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
        });

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};

const trackFailedAttempt = (email) => {
    if (!loginAttempts[email]) {
        loginAttempts[email] = { attempts: 1, timestamp: Date.now() };
    } else {
        loginAttempts[email].attempts += 1;
        loginAttempts[email].timestamp = Date.now();
    }
};

module.exports = { register, login, logout };
