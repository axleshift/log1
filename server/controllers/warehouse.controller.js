import Warehouse from "../models/warehouse.models.js";
import mongoose from "mongoose";
export const addWarehouseItem = async (req, res) => {
    const warehouse = req.body;
    if (!warehouse.name || !warehouse.from || !warehouse.itemName || !warehouse.quantity || !warehouse.weight || !warehouse.length || !warehouse.width || !warehouse.height || !warehouse.dateArrival || !warehouse.category || !warehouse.warehouse) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newWarehouseItem = new Warehouse(warehouse);
    try {
        await newWarehouseItem.save();
        return res.status(201).json({ success: true, message: " Added successfully", data: newWarehouseItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getWarehouseItems = async (req, res) => {
    try {
        const warehouseItems = await Warehouse.find({}).populate("warehouse", "warehouseName");
        res.status(200).json({ success: true, data: warehouseItems });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteWarehouseItem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid id" });
    }
    try {
        await Warehouse.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateWarehouseItem = async (req, res) => {
    const { id } = req.params;
    const warehouse = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid id" });
    }
    if (!warehouse.name || !warehouse.from || !warehouse.itemName || !warehouse.quantity || !warehouse.weight || !warehouse.length || !warehouse.width || !warehouse.height || !warehouse.dateArrival || !warehouse.category || !warehouse.warehouse || !warehouse.byReceived) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const updatedWarehouseItem = await Warehouse.findByIdAndUpdate(id, warehouse, { new: true });
        return res.status(200).json({ success: true, data: updatedWarehouseItem });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
