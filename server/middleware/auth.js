import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    // try {
    //     // Get token from header
    //     const authHeader = req.headers.authorization;
    //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //         return res.status(401).json({ message: "No token provided" });
    //     }

    //     // Extract token
    //     const token = authHeader.split(" ")[1];

    //     // Verify token
    //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //         if (err) {
    //             console.log("Token verification failed:", err.message);
    //             return res.status(403).json({ message: "Invalid or expired token" });
    //         }

    //         // Add user info to request
    //         req.user = decoded;
    //         next();
    //     });
    // } catch (error) {
    //     console.error("Auth middleware error:", error);
    //     return res.status(500).json({ message: "Internal server error" });
    // }
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
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

export const authenticateUser = (req, res, next) => {
    authenticate(req, res, () => {
        if (!req.user.userId) {
            return res.status(403).json({ message: "Access denied. User rights required." });
        }
        next();
    });
};
