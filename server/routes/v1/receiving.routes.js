import express from "express";
import { addReceivingSchedule, getVehiclesInUse } from "../../controllers/receiving.controller.js";

const router = express.Router();

router.post("/add", addReceivingSchedule);
router.get("/vehicles-in-use", getVehiclesInUse);

export default router;
