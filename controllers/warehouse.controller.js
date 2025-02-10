import Warehouse from "../models/warehouse.models.js";
import mongoose from "mongoose";

export const addWarehouseItem = async (req, res) => {
    const { from, items, dateArrival, warehouse, byReceived, PoNumber } = req.body;

    if (!from || !items || !dateArrival || !warehouse) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: "Items must be a non-empty array" });
    }

    if (!items.every((item) => item.quantity)) {
        return res.status(400).json({ success: false, message: "Each item must have a quantity" });
    }
    const existingPoNumber = await Warehouse.findOne({ PoNumber });
    if (existingPoNumber) {
        return res.status(400).json({ success: false, message: "PO number already exists" });
    }

    const newWarehouseItem = new Warehouse({
        from,
        items: items.map((item) => ({ itemName: item.itemName, quantity: item.quantity })),
        dateArrival,
        warehouse,
        byReceived,
        PoNumber,
    });

    try {
        await newWarehouseItem.save();
        return res.status(201).json({ success: true, message: "Added successfully", data: newWarehouseItem });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getWarehouseItems = async (req, res) => {
    try {
        console.log("Fetching warehouse items...");
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
    if (!warehouse.from || !warehouse.dateArrival || !warehouse.warehouse || !warehouse.byReceived || !warehouse.items || !warehouse.items[0].itemName || !warehouse.items[0].quantity) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const updatedWarehouseItem = await Warehouse.findByIdAndUpdate(id, warehouse, { new: true });
        return res.status(200).json({ success: true, data: updatedWarehouseItem });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Warehouse.find();
        const groupedItems = items.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.itemName === item.itemName);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
            return acc;
        }, []);

        return res.status(200).json({ success: true, data: groupedItems });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching items" });
    }
};

export const checkIfPoNumberExists = async (req, res) => {
    const poNumber = req.params.poNumber;
    const exists = await Warehouse.exists({ PoNumber: poNumber });
    res.json({ exists });
};
