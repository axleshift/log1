export const protectRoute = (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    // List of routes that require authentication
    const protectedRoutes = ["/register", "/dashboard"];

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
