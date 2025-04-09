import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import path from "path";
import fs from "fs/promises";
import axios from "axios";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
};

const sendVerificationEmail = async (userEmail, code) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD, // Use the App Password here
            },
            logger: true, // Enable logging
            debug: true, // Include debug info in logs
        });

        // Verify connection
        await transporter.verify();

        const mailOptions = {
            from: `"Axleshift" <${process.env.SMTP_FROM}>`,
            to: userEmail,
            subject: "Login Verification Code",
            text: `Your verification code is: ${code}`,
            html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Login Verification Code</h2>
            <p>Your verification code is:</p>
            <h1 style="color: #4CAF50; font-size: 32px;">${code}</h1>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `,
        };

        const info = await transporter.sendMail(mailOptions);

        return true;
    } catch (error) {
        throw new Error("Failed to send verification email");
    }
};

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

// export const login = async (req, res) => {
//     try {
//         const { username, password, recaptchaToken, verificationCode } = req.body;

//         // Validate required fields
//         if (!username || !password || !recaptchaToken) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields",
//             });
//         }

//         // Verify reCAPTCHA
//         const recaptchaVerification = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
//             params: {
//                 secret: process.env.RECAPTCHA_SECRET_KEY,
//                 response: recaptchaToken,
//             },
//         });

//         const { success: recaptchaSuccess, score } = recaptchaVerification.data;

//         if (!recaptchaSuccess || score < 0.5) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Security check failed",
//             });
//         }

//         // Find user
//         const user = await User.findOne({ username });

//         // Check account lock status
//         if (user?.lockUntil && user.lockUntil > new Date()) {
//             const timeLeft = Math.ceil((user.lockUntil - new Date()) / 1000 / 60);
//             return res.status(403).json({
//                 success: false,
//                 message: `Account is temporarily locked. Try again in ${timeLeft} minutes`,
//                 isLocked: true,
//                 lockUntil: user.lockUntil,
//             });
//         }

//         // Validate credentials
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             if (user) {
//                 user.loginAttempts = (user.loginAttempts || 0) + 1;
//                 if (user.loginAttempts === 5) {
//                     user.lockUntil = new Date(Date.now() + 2 * 60 * 1000);
//                 }
//                 if (user.loginAttempts >= 10) {
//                     user.isActive = false;
//                 }
//                 await user.save();
//             }
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid credentials",
//                 attemptsLeft: user ? 5 - (user.loginAttempts % 5) : 5,
//             });
//         }

//         // If verification code is provided, verify it
//         if (verificationCode) {
//             if (user.verificationCode !== verificationCode || user.verificationCodeExpires < new Date()) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Invalid or expired verification code",
//                     requiresVerification: true,
//                 });
//             }

//             // Clear verification code after successful verification
//             user.verificationCode = null;
//             user.verificationCodeExpires = null;
//             user.loginAttempts = 0;
//             user.lockUntil = null;
//             user.lastLoginTime = new Date();
//             await user.save();

//             // Generate tokens
//             const accessToken = generateAccessToken(user);
//             const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

//             // Set cookies
//             res.cookie("accessToken", accessToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production",
//                 sameSite: "strict",
//                 maxAge: 60 * 1000,
//             });

//             res.cookie("refreshToken", refreshToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production",
//                 sameSite: "strict",
//                 maxAge: 7 * 24 * 60 * 60 * 1000,
//             });

//             return res.json({
//                 success: true,
//                 message: "Login successful",
//                 accessToken,
//                 refreshToken,
//                 user: {
//                     username: user.username,
//                     email: user.email,
//                     role: user.role,
//                     photo: user.photo,
//                 },
//                 recaptchaScore: score,
//             });
//         } else {
//             // Generate and save new verification code
//             const code = generateVerificationCode();
//             user.verificationCode = code;
//             user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
//             await user.save();

//             try {
//                 await sendVerificationEmail(user.email, code);
//                 return res.status(200).json({
//                     success: true,
//                     message: `Verification code sent to ${user.email.replace(/(?<=.{3}).(?=.*@)/g, "*")}`,
//                     requiresVerification: true,
//                 });
//             } catch (emailError) {
//                 user.verificationCode = null;
//                 user.verificationCodeExpires = null;
//                 await user.save();
//                 throw new Error("Failed to send verification code");
//             }
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message || "An error occurred during login",
//         });
//     }
// };

export const login = async (req, res) => {
    try {
        const { username, password, verificationCode, recaptchaToken } = req.body;

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

        const { success: recaptchaSuccess, score } = recaptchaVerification.data;

        if (!recaptchaSuccess || score < 0.5) {
            return res.status(400).json({
                success: false,
                message: "Security check failed",
            });
        }

        // Find user
        const user = await User.findOne({ username });

        // Check if account is deactivated
        if (user?.isActive === false) {
            return res.status(403).json({
                success: false,
                message: "Account has been deactivated due to too many failed attempts. Please contact support.",
                isDeactivated: true,
            });
        }

        // Check if account is currently locked
        if (user?.lockUntil && user.lockUntil > new Date()) {
            const timeLeft = Math.ceil((user.lockUntil - new Date()) / 1000);
            return res.status(423).json({
                success: false,
                message: "Account is temporarily locked",
                isLocked: true,
                lockUntil: user.lockUntil,
                timeLeft,
                attemptsLeft: 10 - user.loginAttempts, // Show remaining attempts before deactivation
            });
        }

        // Check if user exists and verify password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            if (user) {
                // Increment login attempts
                user.loginAttempts = (user.loginAttempts || 0) + 1;

                // Deactivate account if 10 or more failed attempts
                if (user.loginAttempts >= 10) {
                    user.isActive = false;
                    await user.save();

                    return res.status(403).json({
                        success: false,
                        message: "Account has been deactivated due to too many failed attempts. Please contact support.",
                        isDeactivated: true,
                    });
                }

                // Lock account if 5 attempts reached (but less than 10)
                if (user.loginAttempts >= 5 && user.loginAttempts < 10) {
                    user.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes lock
                    await user.save();

                    return res.status(423).json({
                        success: false,
                        message: "Maximum login attempts exceeded. Account locked for 2 minutes.",
                        isLocked: true,
                        lockUntil: user.lockUntil,
                        timeLeft: 120,
                        attemptsLeft: 10 - user.loginAttempts, // Remaining attempts before deactivation
                    });
                }

                await user.save();

                return res.status(401).json({
                    success: false,
                    message: `Invalid credentials. ${user.loginAttempts >= 5 ? `Account will be deactivated after ${10 - user.loginAttempts} more failed attempts.` : `Account will be locked after ${5 - user.loginAttempts} more failed attempts.`}`,
                    attemptsLeft: user.loginAttempts >= 5 ? 10 - user.loginAttempts : 5 - user.loginAttempts,
                    totalAttemptsLeft: 10 - user.loginAttempts,
                });
            }

            // Generic error for non-existent user
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                attemptsLeft: 5,
                totalAttemptsLeft: 10,
            });
        }

        // If verification code is provided, verify it
        if (verificationCode) {
            if (!user.verificationCode || user.verificationCode !== verificationCode || user.verificationCodeExpires < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid or expired verification code",
                    requiresVerification: true,
                });
            }

            // Clear verification code after successful verification
            user.verificationCode = null;
            user.verificationCodeExpires = null;
            user.loginAttempts = 0; // Reset attempts on successful verification
            user.lockUntil = null;
            await user.save();
        } else {
            // Generate and send new verification code
            const code = generateVerificationCode();
            user.verificationCode = code;
            user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

            try {
                await sendVerificationEmail(user.email, code);
                await user.save();

                return res.status(200).json({
                    success: true,
                    message: "Verification code sent",
                    requiresVerification: true,
                });
            } catch (emailError) {
                console.error("Email error:", emailError);
                return res.status(500).json({
                    success: false,
                    message: "Failed to send verification code",
                });
            }
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                photo: user.photo,
            },
            recaptchaScore: score,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
};

export const resendVerificationCode = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const code = generateVerificationCode();
        user.verificationCode = code;
        user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        await sendVerificationEmail(user.email, code);

        return res.status(200).json({
            success: true,
            message: "New verification code sent",
        });
    } catch (error) {
        console.error("Resend verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to resend verification code",
        });
    }
};

// export const resendVerificationCode = async (req, res) => {
//     try {
//         const { username } = req.body;
//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const code = generateVerificationCode();
//         user.verificationCode = code;
//         user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
//         await user.save();

//         await sendVerificationEmail(user.email, code);

//         return res.status(200).json({
//             success: true,
//             message: `New verification code sent to ${user.email.replace(/(?<=.{3}).(?=.*@)/g, "*")}`,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Failed to resend verification code",
//         });
//     }
// };

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
