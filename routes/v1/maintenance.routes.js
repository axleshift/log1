import express from "express";
import { createMaintenanceInspection, getMaintenanceInspection, deleteMaintenanceInspection, updateMaintenanceInspection } from "../../controllers/maintenance.inspection.controller.js";

const router = express.Router();
router.post("/inspection", createMaintenanceInspection);
router.get("/inspections", getMaintenanceInspection);
router.delete("/inspection/:id", deleteMaintenanceInspection);
router.put("/inspection/:id", updateMaintenanceInspection);

export default router;
