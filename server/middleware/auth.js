import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const authenticate = async (req, res, next) => {
    try {
        let token;

        // Get token from Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // Get user from token
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }

            // Check if user is active
            if (!user.isActive) {
                return res.status(403).json({
                    success: false,
                    message: "Your account has been deactivated",
                });
            }

            // Add user to request object
            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired",
                    isExpired: true,
                });
            }
            throw error;
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized",
        });
    }
};

export const authenticateAdmin = (req, res, next) => {
    authenticate(req, res, () => {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin rights required." });
        }
        next();
    });
};

// export const authenticateUser = (req, res, next) => {
//     authenticate(req, res, () => {
//         if (!req.user.userId) {
//             return res.status(403).json({ message: "Access denied. User rights required." });
//         }
//         next();
//     });
// };

export const authenticateUser = async (req, res, next) => {
    try {
        await authenticate(req, res, () => {
            if (!req.user._id) {
                return res.status(403).json({ message: "Access denied. User rights required." });
            }
            next();
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
        });
    }
};
