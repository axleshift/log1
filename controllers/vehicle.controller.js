import Vehicle from "../models/vehicle.models.js";
import Driver from "../models/driver.models.js";
import mongoose from "mongoose";

const updateVehicleStatusBasedOnExpiration = async (vehicle) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    const expirationDate = new Date(vehicle.regisExprationDate);
    expirationDate.setHours(0, 0, 0, 0);

    // Check if the date has passed or is today
    if (expirationDate <= today && vehicle.status !== "forRegistration") {
        try {
            await Vehicle.findByIdAndUpdate(vehicle._id, { status: "forRegistration" });
            return true;
        } catch (error) {
            console.log("Error updating vehicle status: ", error.message);
            return false;
        }
    }

    if (expirationDate > today && vehicle.status === "forRegistration") {
        try {
            const currentVehicle = await Vehicle.findById(vehicle._id).populate("assignedDriver");

            const updatedStatus = currentVehicle.assignedDriver ? "in_use" : "available";

            await Vehicle.findByIdAndUpdate(vehicle._id, {
                status: updatedStatus,
            });
            return true;
        } catch (error) {
            console.log("Error updating vehicle status: ", error.message);
            return false;
        }
    }
    return false;
};

export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ deleted: false }).populate("assignedDriver");

        // Check and update status for each vehicle
        for (let vehicle of vehicles) {
            await updateVehicleStatusBasedOnExpiration(vehicle);
        }
        const updatedVehicles = await Vehicle.find({ deleted: false }).populate("assignedDriver");
        // res.status(200).json({ success: true, data: vehicles });

        res.status(200).json({ success: true, data: updatedVehicles });
    } catch (error) {
        console.log("Error in fetching vehicle: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getRestoredVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ deleted: true }).populate("assignedDriver");

        // Check and update status for each vehicle
        for (let vehicle of vehicles) {
            await updateVehicleStatusBasedOnExpiration(vehicle);
        }
        const updatedVehicles = await Vehicle.find({ deleted: true }).populate("assignedDriver");
        // res.status(200).json({ success: true, data: vehicles });

        res.status(200).json({ success: true, data: updatedVehicles });
    } catch (error) {
        console.log("Error in fetching vehicle: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createVehicle = async (req, res) => {
    const vehicle = req.body;

    if (!vehicle.idNum || !vehicle.brand || !vehicle.model || !vehicle.year || !vehicle.regisExprationDate || !vehicle.regisNumber || !vehicle.type || !vehicle.capacity || !vehicle.fuelType || !vehicle.currentMileage) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const existingVehicle = await Vehicle.findOne({ regisNumber: vehicle.regisNumber });
    if (existingVehicle) {
        return res.status(409).json({ success: false, message: "Vehicle already exists" });
    }

    const newVehicle = new Vehicle(vehicle);

    try {
        await newVehicle.save();
        // Check expiration status right after creation
        await updateVehicleStatusBasedOnExpiration(newVehicle);
        const updatedVehicle = await Vehicle.findById(newVehicle._id);
        // return res.status(201).json({ success: true, message: "Vehicle created successfully", data: newVehicle });
        return res.status(201).json({ success: true, message: "Vehicle created successfully", data: updatedVehicle });
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
    if (!vehicle.idNum || !vehicle.brand || !vehicle.model || !vehicle.year || !vehicle.regisExprationDate || !vehicle.regisNumber || !vehicle.type || !vehicle.capacity || !vehicle.fuelType || !vehicle.currentMileage) {
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
        // res.status(200).json({ success: true, data: updatedVehicle, message: "Vehicle updated successfully" });
        await updateVehicleStatusBasedOnExpiration(updatedVehicle);
        // Check expiration status after update
        const finalVehicle = await Vehicle.findById(id);
        res.status(200).json({ success: true, data: finalVehicle, message: "Vehicle updated successfully" });
    } catch (error) {
        console.log({ "Error in updating vehicle: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// export const deleteVehicle = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ success: false, message: " Invalid Vehicle Id" });
//     }
//     await Driver.findByIdAndUpdate({ assignedVehicle: id }, { assignedVehicle: null, status: "available" });

//     try {
//         await Vehicle.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() }, { new: true });
//         res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
//     } catch (error) {
//         console.log({ "Error in deleting vehicle: ": error.message });
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };
export const deleteVehicle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Vehicle Id" });
    }

    try {
        // First, check if the vehicle exists
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        // Update the driver who has this vehicle assigned
        await Driver.findOneAndUpdate({ assignedVehicle: id }, { assignedVehicle: null, status: "available" });

        // Soft delete the vehicle
        await Vehicle.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() }, { new: true });

        res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
    } catch (error) {
        console.log("Error in deleting vehicle:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getAvailableVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ assignedDriver: null, status: "available", deleted: false });

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

export const getAllVehiclesNotMaintenance = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ status: { $ne: "maintenance" } });
        // $ne means "not equal to"

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

// For Fuel Analytics Dashboard
export const getVehicleAnalytics = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({}).populate("assignedDriver");

        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        console.log("Error in fetching vehicle: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const restoreVehicle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Vehicle Id" });
    }

    try {
        // Find and restore the vehicle by setting deleted to false and clearing deletedAt
        const restoredVehicle = await Vehicle.findByIdAndUpdate(
            id,
            {
                deleted: false,
                deletedAt: null,
                status: "available", // Reset status to available
                assignedDriver: null,
            },
            { new: true }
        );

        if (!restoredVehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        res.status(200).json({
            success: true,
            message: "Vehicle restored successfully",
            data: restoredVehicle,
        });
    } catch (error) {
        console.log("Error in restoring vehicle:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
