import Driver from "./../models/driver.models.js";
import mongoose from "mongoose";

export const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({});
        res.status(200).json({ success: true, data: drivers });
    } catch (error) {
        console.log("Error in fetching drivers: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const createDriver = async (req, res) => {
    const driver = req.body;

    if (!driver.idNum || !driver.driverName || !driver.email || !driver.phone || !driver.address || !driver.licenseNumber) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const existingDriver = await Driver.findOne({ licenseNumber: driver.licenseNumber });
    if (existingDriver) {
        return res.status(400).json({ success: false, message: "Driver already exists" });
    }

    const newDriver = new Driver(driver);
    try {
        await newDriver.save();
        return res.status(201).json({ success: true, message: "Driver created successfully", data: newDriver });
    } catch (error) {
        console.error("Error in creating driver: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateDriver = async (req, res) => {
    const { id } = req.params;
    const driver = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Driver not found" });
    }

    try {
        const updatedDriver = await Driver.findByIdAndUpdate(id, driver, { new: true });
        res.status(200).json({ success: true, data: updatedDriver });
    } catch (error) {
        console.log({ "Error in updating driver: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteDriver = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Driver not found" });
    }

    try {
        await Driver.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Driver deleted successfully" });
    } catch (error) {
        console.log({ "Error in deleting driver: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
