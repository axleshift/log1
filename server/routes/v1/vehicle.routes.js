import express from "express";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle, getAvailableVehicles, inspectionVehicles, getAvailableVehicles2 } from "../../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", getVehicles);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.get("/available", getAvailableVehicles);
router.get("/inspection", inspectionVehicles);
router.get("/in-use", getAvailableVehicles2);

export default router;
