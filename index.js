import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/v1/indexRoute.js";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
dotenv.config();
//Middleware
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === "production", // Use secure in production
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict", // Use "strict" mode for cookies to be sent only over HTTPS
        },
    })
);

//Routes
app.use("/api/v1/", userRouter);
// app.use("/api/vehicle", protectRoute, vehicleRouter);
// app.use("/api/driver", protectRoute, driverRouter);
//Start server
const PORT = process.env.PORT || 5057;
app.listen(PORT, () => {
    // connect to database
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
