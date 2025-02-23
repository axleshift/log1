import Vehicle from "../models/vehicle.models.js";
import mongoose from "mongoose";
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({}).populate("assignedDriver");
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        console.log("Error in fetching vehicle: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createVehicle = async (req, res) => {
    const vehicle = req.body;

    if (!vehicle.idNum || !vehicle.brand || !vehicle.model || !vehicle.year || !vehicle.regisNumber || !vehicle.type || !vehicle.capacity || !vehicle.fuelType || !vehicle.currentMileage) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const existingVehicle = await Vehicle.findOne({ regisNumber: vehicle.regisNumber });
    if (existingVehicle) {
        return res.status(409).json({ success: false, message: "Vehicle already exists" });
    }

    const newVehicle = new Vehicle(vehicle);

    try {
        await newVehicle.save();
        return res.status(201).json({ success: true, message: "Vehicle created successfully", data: newVehicle });
    } catch (error) {
        console.error("Error in creat vehicle: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const vehicle = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Vehicle not found" });
    }
    if (!vehicle.idNum || !vehicle.brand || !vehicle.model || !vehicle.year || !vehicle.regisNumber || !vehicle.type || !vehicle.capacity || !vehicle.fuelType || !vehicle.currentMileage) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const existingVehicle = await Vehicle.findOne({
            regisNumber: vehicle.regisNumber,
            _id: { $ne: id },
        });

        if (existingVehicle) {
            return res.status(400).json({
                success: false,
                message: "Registration number already exists for another vehicle",
            });
        }
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, vehicle, { new: true });
        res.status(200).json({ success: true, data: updatedVehicle, message: "Vehicle updated successfully" });
    } catch (error) {
        console.log({ "Error in updating vehicle: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteVehicle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: " Invalid Vehicle Id" });
    }

    try {
        await Vehicle.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
    } catch (error) {
        console.log({ "Error in deleting vehicle: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getAvailableVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ assignedDriver: null, status: "available" });

        res.status(200).json({
            success: true,
            data: vehicles,
            message: "Available vehicles fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};
export const inspectionVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ status: { $in: ["available", "in_use"] } });
        res.status(200).json({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCurrentDriver = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Vehicle Id" });
    }

    try {
        const vehicle = await Vehicle.findById(id).populate("driver");
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        const currentDriver = vehicle.driver;
        res.status(200).json({ success: true, data: currentDriver });
    } catch (error) {
        console.log({ "Error in getting current driver: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
export const getAvailableVehicles2 = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ status: "in_use" });

        res.status(200).json({
            success: true,
            data: vehicles,
            message: "Available vehicles fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
