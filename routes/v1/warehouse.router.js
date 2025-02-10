import express from "express";
import { addWarehouseItem, getWarehouseItems, deleteWarehouseItem, updateWarehouseItem, getAllItems, checkIfPoNumberExists } from "../../controllers/warehouse.controller.js";

const router = express.Router();

router.post("/addItem", addWarehouseItem);
router.get("/items", getWarehouseItems);
router.get("/items/all", getAllItems);
router.delete("/delete/:id", deleteWarehouseItem);
router.put("/update/:id", updateWarehouseItem);
router.get("/checkPoNumber/:poNumber", checkIfPoNumberExists);

export default router;
