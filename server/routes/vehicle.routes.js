import express from "express";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from "../controllers/vehicle.controller.js";
import varify from "../middleWare/auth.js";

const router = express.Router();

router.get("/", varify, getVehicles);
router.post("/", varify, createVehicle);
router.put("/:id", varify, updateVehicle);
router.delete("/:id", varify, deleteVehicle);

export default router;
