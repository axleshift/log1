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

// export const createDriver = async (req, res) => {
//     const driver = req.body;

//     if (!driver.idNum || !driver.driverName || !driver.email || !driver.phone || !driver.address || !driver.licenseNumber) {
//         return res.status(400).json({ success: false, message: "All fields are required" });
//     }
//     const existingDriver = await Driver.findOne({ licenseNumber: driver.licenseNumber });
//     if (existingDriver) {
//         return res.status(400).json({ success: false, message: "Driver already exists" });
//     }

//     if (!driver.assignedVehicle || driver.assignedVehicle === "") {
//         driver.assignedVehicle = null;
//     }

//     if (driver.driverName) {
//         await Vehicle.findOneAndUpdate({ assignedDriver: driver.driverName });
//     }
//     if (driver.assignedVehicle) {
//         await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {
//             status: "in_use",
//             assignedDriver: driver.driverName,
//         });
//     }

//     const newDriver = new Driver(driver);
//     try {
//         await newDriver.save();
//         return res.status(201).json({ success: true, message: "Driver created successfully", data: newDriver });
//     } catch (error) {
//         console.error("Error in creating driver: ", error.message);
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

export const createDriver = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const driver = req.body;

        // Validate required fields
        if (!driver.idNum || !driver.driverName || !driver.email || !driver.phone || !driver.address || !driver.licenseNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check for existing driver
        const existingDriver = await Driver.findOne({
            licenseNumber: driver.licenseNumber,
        }).session(session);

        if (existingDriver) {
            return res.status(400).json({
                success: false,
                message: "Driver already exists",
            });
        }

        // Handle vehicle assignment
        if (!driver.assignedVehicle || driver.assignedVehicle === "") {
            driver.assignedVehicle = null;
        }

        // Create and save new driver first to get the ObjectId
        const newDriver = new Driver(driver);
        await newDriver.save({ session });

        // If vehicle is assigned, update vehicle status with driver's ObjectId
        if (driver.assignedVehicle) {
            const vehicle = await Vehicle.findById(driver.assignedVehicle).populate("assignedDriver").session(session);

            if (!vehicle) {
                return res.status(404).json({
                    success: false,
                    message: "Vehicle not found",
                });
            }

            // Check if vehicle is already assigned
            if (vehicle.assignedDriver) {
                return res.status(400).json({
                    success: false,
                    message: "Vehicle is already assigned to another driver",
                });
            }

            // Update vehicle with driver's ObjectId
            await Vehicle.findByIdAndUpdate(
                driver.assignedVehicle,
                {
                    status: "in_use",
                    assignedDriver: newDriver._id, // Store driver's ObjectId instead of name
                },
                { session }
            );
        }

        await session.commitTransaction();

        return res.status(201).json({
            success: true,
            message: "Driver created successfully",
            data: newDriver,
        });
    } catch (error) {
        await session.abortTransaction();
        console.error("Error in creating driver: ", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    } finally {
        session.endSession();
    }
};

// export const updateDriver = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const driver = req.body;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(404).json({ success: false, message: "Invalid driver ID format" });
//         }

//         if (!driver.idNum || !driver.driverName || !driver.email || !driver.phone || !driver.address || !driver.licenseNumber) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const currentDriver = await Driver.findById(id);
//         if (!currentDriver) {
//             return res.status(404).json({ success: false, message: "Driver not found" });
//         }

//         const existingDriver = await Driver.findOne({
//             licenseNumber: driver.licenseNumber,
//             _id: { $ne: id },
//         });

//         if (existingDriver) {
//             return res.status(400).json({ success: false, message: "Driver already exists" });
//         }

//         if (driver.status === "off_duty") {
//             if (currentDriver.assignedVehicle) {
//                 await Vehicle.findByIdAndUpdate(currentDriver.assignedVehicle, {
//                     status: "available",
//                     assignedDriver: null,
//                     assignedVehicle: null,
//                 });
//             }
//             driver.assignedVehicle = null;
//         }

//         const vehicleCheck = await Vehicle.findById(driver.assignedVehicle);
//         if (vehicleCheck && vehicleCheck.status === "in_use" && vehicleCheck.assignedDriver !== driver.driverName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "This vehicle is already assigned to another driver",
//             });
//         }

//         await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {
//             status: "in_use",
//             assignedDriver: driver.driverName,
//         });

//         const updatedDriver = await Driver.findByIdAndUpdate(id, driver, { new: true, runValidators: true });

//         return res.status(200).json({ success: true, data: updatedDriver });
//     } catch (error) {
//         console.error("Error in updating driver:", error);
//         return res.status(500).json({ success: false, message: "Server Error" });
//     }
// };
export const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid driver ID format" });
        }

        if (!driver.idNum || !driver.driverName || !driver.email || !driver.phone || !driver.address || !driver.licenseNumber) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const currentDriver = await Driver.findById(id);
        if (!currentDriver) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }

        const existingDriver = await Driver.findOne({
            licenseNumber: driver.licenseNumber,
            _id: { $ne: id },
        });

        if (existingDriver) {
            return res.status(400).json({ success: false, message: "Driver already exists" });
        }

        // Handle off-duty status
        if (driver.status === "off_duty") {
            if (currentDriver.assignedVehicle) {
                await Vehicle.findByIdAndUpdate(currentDriver.assignedVehicle, {
                    status: "available",
                    assignedDriver: null,
                });
            }
            driver.assignedVehicle = null;
        }

        // Check if vehicle is already assigned to another driver
        if (driver.assignedVehicle) {
            const vehicleCheck = await Vehicle.findById(driver.assignedVehicle).populate("assignedDriver");
            if (vehicleCheck && vehicleCheck.status === "in_use" && vehicleCheck.assignedDriver && vehicleCheck.assignedDriver._id.toString() !== id) {
                return res.status(400).json({
                    success: false,
                    message: "This vehicle is already assigned to another driver",
                });
            }

            // Update vehicle with driver's ID (not name)
            await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {
                status: "in_use",
                assignedDriver: id, // Use driver's ID instead of name
            });
        }

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
        const driver = await Driver.findById(id);

        if (!driver) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }

        if (driver.assignedVehicle) {
            await Vehicle.findByIdAndUpdate(driver.assignedVehicle, {
                assignedDriver: null,
                status: "available",
            });
        }

        await Driver.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Driver deleted successfully" });
    } catch (error) {
        console.log({ "Error in deleting driver: ": error.message });
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
