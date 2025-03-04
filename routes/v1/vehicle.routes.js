import express from "express";
import { getVehicles, getRestoredVehicles, createVehicle, updateVehicle, deleteVehicle, getAvailableVehicles, inspectionVehicles, getAvailableVehicles2, getVehicleAnalytics, restoreVehicle } from "../../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", getVehicles);
router.get("/analytics", getVehicleAnalytics);
router.get("/available", getAvailableVehicles);
router.get("/inspection", inspectionVehicles);
router.get("/in-use", getAvailableVehicles2);
router.get("/restored", getRestoredVehicles);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.patch("/:id", deleteVehicle);
router.patch("/restore/:id", restoreVehicle);

export default router;
