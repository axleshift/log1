import express from "express";
import { addWarehouseItem, getWarehouseItems, deleteWarehouseItem, updateWarehouseItem } from "../../controllers/warehouse.controller.js";

const router = express.Router();

router.post("/addItem", addWarehouseItem);
router.get("/items", getWarehouseItems);
router.delete("/delete/:id", deleteWarehouseItem);
router.put("/update/:id", updateWarehouseItem);

export default router;
