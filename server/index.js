import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import vehicleRouter from "./routes/vehicle.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
const PORT = process.env.PORT || 5057;
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/vehicle", vehicleRouter);

// connect to database

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

//
