import Driver from "./../models/driver.models.js";
import Vehicle from "./../models/vehicle.models.js";
import mongoose from "mongoose";

export const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({}).populate("assignedVehicle");
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
    // If you want to update a vehicle with the driver name
    if (driver.driverName) {
        await Vehicle.findOneAndUpdate({ assignedDriver: driver.driverName });
    }
    // Handle empty assignedVehicle
    if (!driver.assignedVehicle || driver.assignedVehicle === "") {
        driver.assignedVehicle = null; // Set to null instead of empty string
    }
    if (driver.assignedVehicle) {
        await Vehicle.findByIdAndUpdate(driver.assignedVehicle, { status: "in_use" });
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
    try {
        const { id } = req.params;
        const driver = req.body;

        // Validate MongoDB ObjectId first
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid driver ID format" });
        }

        // Check if all required fields are present
        if (!driver.idNum || !driver.driverName || !driver.email || !driver.phone || !driver.address || !driver.licenseNumber) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Get the current driver to check their assigned vehicle
        const currentDriver = await Driver.findById(id);
        if (!currentDriver) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }

        // Check for existing driver with same license number
        const existingDriver = await Driver.findOne({
            licenseNumber: driver.licenseNumber,
            _id: { $ne: id },
        });

        if (existingDriver) {
            return res.status(400).json({ success: false, message: "Driver already exists" });
        }

        // Handle vehicle status based on driver status
        if (driver.status === "off_duty") {
            // If driver is going off duty, update their current vehicle to available
            if (currentDriver.assignedVehicle) {
                await Vehicle.findByIdAndUpdate(currentDriver.assignedVehicle, {
                    status: "available",
                    assignedDriver: null,
                    assignedVehicle: null,
                });
            }
            // Clear the vehicle assignment from the driver
            driver.assignedVehicle = null;
        }
        // else if (driver.assignedVehicle) {
        //     // Check if the driver is being assigned to a different vehicle
        //     if (currentDriver.assignedVehicle && currentDriver.assignedVehicle.toString() !== driver.assignedVehicle) {
        //         // Set the old vehicle to available
        //         await Vehicle.findByIdAndUpdate(currentDriver.assignedVehicle, {
        //             status: "available",
        //             assignedDriver: null,
        //         });
        //     }

        // Check if the new vehicle is already assigned to another driver
        const vehicleCheck = await Vehicle.findById(driver.assignedVehicle);
        if (vehicleCheck && vehicleCheck.status === "in_use" && vehicleCheck.assignedDriver !== driver.driverName) {
            return res.status(400).json({
                success: false,
                message: "This vehicle is already assigned to another driver",
            });
        }

        // Update the new vehicle status
        await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {
            status: "in_use",
            assignedDriver: driver.driverName,
        });
        // }

        // Update driver
        const updatedDriver = await Driver.findByIdAndUpdate(id, driver, { new: true, runValidators: true });

        return res.status(200).json({ success: true, data: updatedDriver });
    } catch (error) {
        console.error("Error in updating driver:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteDriver = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Driver not found" });
    }

    try {
        // First fetch the driver to get their assigned vehicle
        const driver = await Driver.findById(id);

        if (!driver) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }

        // Update vehicle if driver had an assigned vehicle
        if (driver.assignedVehicle) {
            await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {
                assignedDriver: "not yet assigned",
                status: "available",
            });
        }

        // Delete the driver
        await Driver.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Driver deleted successfully" });
    } catch (error) {
        console.log({ "Error in deleting driver: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
