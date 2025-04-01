import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import path from "path";
import fs from "fs/promises";
import axios from "axios";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateAccessToken = (user) => {
    const payload = {
        userId: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({ userId: decodedToken.userId, role: decodedToken.role, username: decodedToken.username, email: decodedToken.email, isLoggedIn: decodedToken.isLoggedIn }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
        return res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Error verifying refresh token:", error);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password, recaptchaToken } = req.body;
        if (!username || !password || !recaptchaToken) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const recaptchaVerification = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: recaptchaToken,
            },
        });

        const { success, score } = recaptchaVerification.data;

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "reCAPTCHA verification failed",
            });
        }

        if (score < 0.5) {
            return res.status(400).json({
                success: false,
                message: "Security check failed",
            });
        }

        const user = await User.findOne({ username });

        if (user && user.lockUntil && user.lockUntil > new Date()) {
            const timeLeft = Math.ceil((user.lockUntil - new Date()) / 1000 / 60);
            return res.status(403).json({
                success: false,
                message: `Account is temporarily locked. Try again in ${timeLeft} minutes`,
                isLocked: true,
                lockUntil: user.lockUntil,
            });
        }

        if (user && !user.isActive && user.loginAttempts >= 5) {
            return res.status(403).json({
                success: false,
                message: "Account has been deactivated due to too many failed attempts. Please contact an administrator.",
                isDeactivated: true,
            });
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
            if (user) {
                user.loginAttempts = (user.loginAttempts || 0) + 1;

                if (user.loginAttempts === 5) {
                    user.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
                }

                if (user.loginAttempts >= 10) {
                    user.isActive = false;
                }

                await user.save();
            }
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                attemptsLeft: user ? 5 - (user.loginAttempts % 5) : 5,
            });
        }

        user.lastLoginTime = new Date();
        user.loginAttempts = 0;
        user.lockUntil = null;

        await user.save();
        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({
                message: "Your account has been deactivated. Please contact an administrator.",
            });
        }
        // Generate tokens
        const accessToken = generateAccessToken(user);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 1000,
        });

        const refreshToken = jwt.sign({ userId: user._id, role: user.role, username: user.username, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                photo: user.photo,
            },
            recaptchaScore: score,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            if (req.file) {
                try {
                    const filePath = path.join(__dirname, "../uploads/profiles", req.file.filename);
                    await fs.unlink(filePath);
                } catch (err) {
                    console.error("Error deleting uploaded file:", err);
                }
            }
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (req.file) {
                try {
                    const filePath = path.join(__dirname, "../uploads/profiles", req.file.filename);
                    await fs.unlink(filePath);
                } catch (err) {
                    console.error("Error deleting uploaded file:", err);
                }
            }
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let photoFilename = null;
        if (req.file) {
            try {
                photoFilename = req.file.filename;
            } catch (err) {
                console.error("Error handling photo:", err);
            }
        }

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
            photo: photoFilename,
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                photo: user.photo,
            },
        });
    } catch (error) {
        if (req.file) {
            try {
                const filePath = path.join(__dirname, "../uploads/profiles", req.file.filename);
                await fs.unlink(filePath);
            } catch (err) {
                console.error("Error deleting uploaded file:", err);
            }
        }

        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                lastLoginTime: null,
                refreshToken: null,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.cookie("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        });

        res.cookie("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        });

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//     try {
//         const user = await User.find({});
//         res.status(200).json({ success: true, data: user });
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

export const getUser = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const inActiveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
            isActive: user.isActive,
        });
    } catch (error) {
        console.error("Error toggling user status:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updateData = {};

        if (updates.username?.trim()) updateData.username = updates.username;
        if (updates.email?.trim()) updateData.email = updates.email;
        if (updates.role?.trim()) updateData.role = updates.role;

        if (updates.password?.trim()) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updates.password, salt);
        }

        if (req.file) {
            try {
                const existingUser = await User.findById(id);
                if (existingUser?.photo) {
                    const oldPhotoPath = path.join(__dirname, "../uploads/profiles", path.basename(existingUser.photo));
                    try {
                        await fs.access(oldPhotoPath);
                        await fs.unlink(oldPhotoPath);
                    } catch (err) {
                        console.log("No existing photo found or error deleting:", err);
                    }
                }

                updateData.photo = req.file.filename;
            } catch (err) {
                console.error("Error handling photo:", err);
            }
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password"); // Exclude password from response

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const userResponse = user.toObject();
        if (userResponse.photo) {
            userResponse.photoUrl = `${process.env.API_URL}/uploads/profiles/${userResponse.photo}`;
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: userResponse,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating user",
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Profile fetch error:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching profile",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { username, email, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;

        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Current password is required",
                });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Current password is incorrect",
                });
            }

            updateData.password = await bcrypt.hash(newPassword, 10);
        }

        if (req.file) {
            if (user.photo) {
                try {
                    const oldPhotoPath = path.join(__dirname, "../uploads/profiles", user.photo);
                    await fs.unlink(oldPhotoPath);
                } catch (err) {
                    console.log("Error deleting old photo:", err);
                }
            }
            updateData.photo = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select("-password -refreshToken");

        const userResponse = updatedUser.toObject();
        if (userResponse.photo) {
            userResponse.photoUrl = `${process.env.API_URL}/uploads/profiles/${userResponse.photo}`;
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: userResponse,
        });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error updating profile",
        });
    }
};
