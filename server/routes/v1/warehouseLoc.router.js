import express from "express";
import { addWarehouseLoc, getWarehouseLoc, deleteWarehouseLoc, updateWarehouseLoc } from "../../controllers/warehouseLoc.controller.js";

const router = express.Router();

router.post("/add", addWarehouseLoc);
router.get("/locations", getWarehouseLoc);
router.delete("/delete/:id", deleteWarehouseLoc);
router.put("/update/:id", updateWarehouseLoc);

export default router;
