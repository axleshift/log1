import Vehicle from "../models/vehicle.models.js";
import mongoose from "mongoose";
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        console.log("Error in fetching vehicle: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createVehicle = async (req, res) => {
    const vehicle = req.body;

    if (!vehicle.idNum || !vehicle.brand || !vehicle.model || !vehicle.year || !vehicle.regisNumber || !vehicle.type || !vehicle.capacity) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newVehicle = new Vehicle(vehicle);
    // console.log(newVehicle);

    try {
        await newVehicle.save();
        return res.status(201).json({ success: true, message: "Vehicle created successfully", data: newVehicle });
    } catch (error) {
        console.error("Error in creat vehicle: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const vehicle = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, vehicle, { new: true });
        res.status(200).json({ success: true, data: updatedVehicle });
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
