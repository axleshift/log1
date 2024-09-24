import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import vehicleRouter from "./routes/vehicle.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/vehicle", vehicleRouter);

// connect to database

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

//
