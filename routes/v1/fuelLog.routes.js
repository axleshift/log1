// routes/fuelLog.routes.js
import express from "express";
import { createFuelLog, getFuelLogs, getFuelAnalytics, deleteFuelLog, updateFuelLog } from "../../controllers/fuelLog.controller.js";
import { uploadReceipts } from "../../middleware/upload.js";
const router = express.Router();

router.post("/fuel-logs", uploadReceipts.single("receiptImage"), createFuelLog);
router.put("/fuel-logs/:id", uploadReceipts.single("receiptImage"), updateFuelLog);

router.get("/fuel-logs", getFuelLogs);
router.get("/fuel-logs/analytics", getFuelAnalytics);
router.delete("/fuel-logs/:id", deleteFuelLog);

export default router;
