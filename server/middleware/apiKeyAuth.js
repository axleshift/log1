export const validateApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    const expectedApiKey = process.env.API_KEY;

    if (!apiKey || apiKey !== expectedApiKey) {
        return res.status(401).json({
            success: false,
            message: "Invalid or missing API key",
        });
    }

    next();
};
