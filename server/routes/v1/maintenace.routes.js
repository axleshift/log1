import express from "express";
import { createMaintenance, completeMaintenance, getAllMaintenance, DeleteMaintenance, updateChecklistItem, UpdateMaintenance } from "../../controllers/maintenance.controller.js";

const router = express.Router();

router.post("/create", createMaintenance);
router.get("/all", getAllMaintenance);
router.delete("/delete/:id", DeleteMaintenance);
router.patch("/:id/checklist/:itemIndex", updateChecklistItem);
router.patch("/complete/:id", completeMaintenance);
router.put("/update/:id", UpdateMaintenance);

export default router;
