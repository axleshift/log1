import warehouseLocModels from "../models/warehouseLoc.models.js";
import mongoose from "mongoose";

export const addWarehouseLoc = async (req, res) => {
    const warehouseLoc = req.body;
    if (!warehouseLoc.warehouseName || !warehouseLoc.address) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newWarehouseLoc = new warehouseLocModels(warehouseLoc);
    try {
        await newWarehouseLoc.save();
        return res.status(201).json({ success: true, message: " Added successfully", data: newWarehouseLoc });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getWarehouseLoc = async (req, res) => {
    try {
        const warehouseLoc = await warehouseLocModels.find({});
        res.status(200).json({ success: true, data: warehouseLoc });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteWarehouseLoc = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid id" });
    }
    try {
        await warehouseLocModels.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateWarehouseLoc = async (req, res) => {
    const { id } = req.params;
    const warehouseLoc = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid id" });
    }
    if (!warehouseLoc.warehouseName || !warehouseLoc.address) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const updatedWarehouseLoc = await warehouseLocModels.findByIdAndUpdate(id, warehouseLoc, { new: true });
        return res.status(200).json({ success: true, data: updatedWarehouseLoc, message: "Location updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
