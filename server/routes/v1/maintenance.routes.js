import express from "express";
import { createMaintenanceInspection, getMaintenanceInspection } from "../../controllers/maintenance.inspection.controller.js";

const router = express.Router();
router.post("/inspection", createMaintenanceInspection);
router.get("/inspections", getMaintenanceInspection);

export default router;
