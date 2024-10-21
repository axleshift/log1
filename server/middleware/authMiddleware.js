// // src/middleware/authMiddleware.js
// import jwt from "jsonwebtoken";

// export const isAuth = (req, res, next) => {
//     const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//         return res;
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = decoded.user;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Token is not valid" });
//     }
// };

// export const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === "admin") {
//         next();
//     } else {
//         res.status(403).json({ message: "Access denied. Admin role required." });
//     }
// };

// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid", redirectToLogin: true });
    }
};

export const isAdmin = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token provided. Authorization denied." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token has a role property and if it's 'admin'
        if (decoded && decoded.role === "admin") {
            req.user = decoded; // Optionally attach the decoded user to the request
            next();
        } else {
            res.status(403).json({ message: "Access denied. Admin role required." });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token. Authorization denied." });
    }
};

export const protectRoute = (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    // List of routes that require authentication
    const protectedRoutes = ["/register", "/dashboard", "/profile", "/admin"];

    // Check if the requested path is in the protectedRoutes list
    if (protectedRoutes.some((route) => req.path.startsWith(route))) {
        if (!token) {
            return res.status(401).json({ message: "Authentication required for this route" });
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token, access denied" });
        }
    } else {
        // If the route is not protected, proceed to the next middleware
        next();
    }
};
