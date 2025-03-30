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
        expiresIn: "1h", // Set the token to expire in 1 hour
    });
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({ userId: decodedToken.userId, role: decodedToken.role, username: decodedToken.username, email: decodedToken.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
        return res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Error verifying refresh token:", error);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};

// export const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         const user = await User.findOne({ username });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
//         // Check if user is active
//         if (!user.isActive) {
//             return res.status(403).json({
//                 message: "Your account has been deactivated. Please contact an administrator.",
//             });
//         }
//         // Generate tokens
//         const accessToken = generateAccessToken(user);
//         res.cookie("accessToken", accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 60 * 1000, // 1 min
//             // path: "http://localhost:5000",
//         });
//         // Set refresh token in HTTP-only cookie
//         const refreshToken = jwt.sign({ userId: user._id, role: user.role, username: user.username, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
//         res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//             // path: "http://localhost:5000",
//         });
//         // Save refresh token to user
//         user.refreshToken = refreshToken;
//         await user.save();

//         // Send access token in response
//         res.json({
//             success: true,
//             message: "Login successful",
//             accessToken,
//             refreshToken,
//             user: {
//                 username: user.username,
//                 email: user.email,
//                 role: user.role,
//                 photo: user.photo,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

export const login = async (req, res) => {
    try {
        const { username, password, recaptchaToken } = req.body;
        if (!username || !password || !recaptchaToken) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        // Verify reCAPTCHA token
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

        // Check the score (0.0 to 1.0)
        if (score < 0.5) {
            return res.status(400).json({
                success: false,
                message: "Security check failed",
            });
        }

        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
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
            maxAge: 60 * 1000, // 1 min
            // path: "http://localhost:5000",
        });
        // Set refresh token in HTTP-only cookie
        const refreshToken = jwt.sign({ userId: user._id, role: user.role, username: user.username, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            // path: "http://localhost:5000",
        });
        // Save refresh token to user
        user.refreshToken = refreshToken;
        await user.save();

        // Send access token in response
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

        // Validate required fields
        if (!username || !email || !password) {
            // If there's a file uploaded but validation fails, delete it
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

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If there's a file uploaded but user exists, delete it
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

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle photo upload
        let photoFilename = null;
        if (req.file) {
            try {
                photoFilename = req.file.filename;
            } catch (err) {
                console.error("Error handling photo:", err);
                // Continue with registration even if photo handling fails
            }
        }

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
            photo: photoFilename,
        });

        // Save user
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
        // If there's an error and a file was uploaded, delete it
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
        // Clear cookies
        res.cookie("accessToken", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        res.cookie("refreshToken", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        // Clear refresh token from user document if stored
        if (req.user) {
            await User.findByIdAndUpdate(req.user.userId, {
                refreshToken: null,
            });
        }

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

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

        // Toggle the isActive status
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

        // Create update object
        const updateData = {};

        // Only include fields that are present and not empty
        if (updates.username?.trim()) updateData.username = updates.username;
        if (updates.email?.trim()) updateData.email = updates.email;
        if (updates.role?.trim()) updateData.role = updates.role;

        // Handle password update
        if (updates.password?.trim()) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updates.password, salt);
        }

        // Handle photo upload
        if (req.file) {
            try {
                // Get existing user to check for old photo
                const existingUser = await User.findById(id);
                if (existingUser?.photo) {
                    const oldPhotoPath = path.join(__dirname, "../uploads/profiles", path.basename(existingUser.photo));
                    try {
                        // Check if file exists before trying to delete
                        await fs.access(oldPhotoPath);
                        await fs.unlink(oldPhotoPath);
                    } catch (err) {
                        console.log("No existing photo found or error deleting:", err);
                    }
                }

                // Save new photo path
                updateData.photo = req.file.filename;
            } catch (err) {
                console.error("Error handling photo:", err);
                // Continue with update even if photo handling fails
            }
        }

        // Find and update the user
        const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password"); // Exclude password from response

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Construct response with full photo URL
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
        // The user ID should be available from the authenticate middleware
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

        // Update basic info
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;

        // Handle password change
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

        // Handle photo upload
        if (req.file) {
            // Delete old photo if exists
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

        // Add full URL for photo
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
