import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Please choose a different username." });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ username, email, password: hashedPassword, role, isActive: true });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
};

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" } // Set to expire in 1 day
    );
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const accessToken = generateToken(user);

        // Store session information
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.role = user.role;
        req.session.email = user.email;

        // Set cookie with validated and sanitized fields
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        };
        res.cookie("connect.sid", req.sessionID, cookieOptions);
        res.cookie("accessToken", accessToken, cookieOptions);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            accessToken,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};

export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).json({ message: "Could not log out, please try again" });
            }

            // Clear the session cookie with validated and sanitized fields
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            };
            res.clearCookie("connect.sid", cookieOptions);

            // Clear the access token cookie if you're using one
            res.clearCookie("accessToken", cookieOptions);

            console.log("Cookies cleared");
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (err) {
        console.error("Error logging out:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
