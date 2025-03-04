import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/v1/indexRoute.js";
import { handleUploadError } from "../server/middleware/upload.js";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUploadDirectories = () => {
    const uploadsDir = path.join(__dirname, "uploads");
    const profilesDir = path.join(__dirname, "uploads/profiles");
    const receiptsDir = path.join(__dirname, "uploads/receipts");

    // Create directories if they don't exist
    [uploadsDir, profilesDir, receiptsDir].forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Created directory: ${dir}`);
        }
    });
};

createUploadDirectories();

const createStaticFileMiddleware = (directory) => {
    return [
        (req, res, next) => {
            res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
            res.setHeader("Access-Control-Allow-Origin", process.env.DEV_URL || process.env.ORIGIN);
            next();
        },
        express.static(path.join(__dirname, "uploads", directory)),
    ];
};
//Middleware
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/profiles", ...createStaticFileMiddleware("profiles"));

app.use("/uploads/receipts", ...createStaticFileMiddleware("receipts"));

const corsOptions = {
    origin: process.env.DEV_URL || process.env.ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
// uncomment this if something goes wrong in CORS policy
// app.use(
//     cors({
//         origin: process.env.DEV_URL || process.env.ORIGIN,
//         credentials: true,
//         allowedHeaders: ["Content-Type", "Authorization"],
//         exposedHeaders: ["Content-Range", "X-Content-Range"],
//     })
// );

app.use(cors(corsOptions));

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
app.use(handleUploadError);
//Start server

// Error handling middleware
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
    });
});

const PORT = process.env.PORT || 5057;
app.listen(PORT, () => {
    // connect to database
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
