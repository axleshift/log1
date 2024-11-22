import express from "express";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle, getAvailableVehicles, inspectionVehicles } from "../../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", getVehicles);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.get("/available", getAvailableVehicles);
router.get("/inspection", inspectionVehicles);

export default router;
