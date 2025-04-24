// server/controllers/maintenance.controller.js
import Maintenance from "../models/maintenance.models.js";
import Vehicle from "../models/vehicle.models.js";
import Driver from "../models/driver.models.js";
import mongoose from "mongoose";

// export const createMaintenance = async (req, res) => {
//     try {
//         const maintenance = req.body;

//         if (!maintenance.vehicle || !maintenance.maintenanceType || !maintenance.description || !maintenance.startDate || !maintenance.expectedEndDate) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }
//         // Update vehicle status and remove assigned driver
//         await Vehicle.findByIdAndUpdate(req.body.vehicle, {
//             status: "maintenance",
//             assignedDriver: null,
//         });

//         const newMaintenance = new Maintenance(maintenance);
//         await newMaintenance.save();
//         res.status(201).json({ success: true, data: maintenance, message: "Maintenance created successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

const checkAndUpdateMaintenanceStatus = async () => {
    try {
        // Get today's date at midnight (start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get tomorrow's date at midnight
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Find maintenances scheduled to start today
        const maintenances = await Maintenance.find({
            status: "Scheduled",
            startDate: {
                $gte: today, // Greater than or equal to start of today
                $lt: tomorrow, // Less than start of tomorrow
            },
        }).populate("vehicle");

        for (const maintenance of maintenances) {
            if (maintenance.vehicle) {
                // Update vehicle status to maintenance
                await Vehicle.findByIdAndUpdate(maintenance.vehicle._id, {
                    status: "maintenance",
                    assignedDriver: null,
                });

                // If vehicle had an assigned driver, update driver status
                if (maintenance.vehicle.assignedDriver) {
                    await Driver.findByIdAndUpdate(maintenance.vehicle.assignedDriver, {
                        status: "available",
                        assignedVehicle: null,
                    });
                }

                // Update maintenance status to In Progress
                await Maintenance.findByIdAndUpdate(maintenance._id, {
                    status: "In Progress",
                });
            }
        }

        return true;
    } catch (error) {
        console.error("Error updating maintenance status:", error);
        throw error;
    }
};

export const createMaintenance = async (req, res) => {
    try {
        const maintenance = req.body;

        if (!maintenance.vehicle || !maintenance.maintenanceType || !maintenance.description || !maintenance.startDate || !maintenance.expectedEndDate) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMaintenance = new Maintenance(maintenance);
        await newMaintenance.save();
        res.status(201).json({ success: true, data: maintenance, message: "Maintenance created successfully" });
    } catch (error) {
        console.error("Error creating maintenance:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const completeMaintenance = async (req, res) => {
    try {
        const maintenanceRecord = await Maintenance.findById(req.params.id);

        if (!maintenanceRecord) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found",
            });
        }

        // Check if maintenance is already completed
        if (maintenanceRecord.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Maintenance is already marked as completed",
            });
        }

        // Check if maintenance has a checklist
        if (!maintenanceRecord.checklist || maintenanceRecord.checklist.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No checklist found for this maintenance",
            });
        }

        // Check if all checklist items are completed
        const uncompletedItems = maintenanceRecord.checklist.filter((item) => !item.completed);

        if (uncompletedItems.length > 0) {
            return res.status(400).json({
                success: false,
                message: `${uncompletedItems.length} checklist items are still incomplete`,
                uncompletedItems: uncompletedItems.map((item) => item.task),
            });
        }

        // If all checks pass, update the maintenance status
        const maintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            {
                status: "Completed",
                actualEndDate: new Date(),
                completedBy: req.body.completedBy, // Add who completed the maintenance
                ...req.body,
            },
            { new: true }
        ).populate("vehicle"); // Populate vehicle details if needed

        // Update vehicle status back to available
        await Vehicle.findByIdAndUpdate(maintenance.vehicle, {
            status: "available",
        });

        res.json({
            success: true,
            data: maintenance,
            message: `Maintenance completed successfully for ${maintenance.vehicle.regisNumber || "vehicle"}`,
        });
    } catch (error) {
        console.error("Error completing maintenance:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Error completing maintenance",
        });
    }
};

export const getAllMaintenance = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        // Add the status update logic here instead
        await checkAndUpdateMaintenanceStatus();

        const query = {
            $or: [{ maintenanceType: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }, { status: { $regex: search, $options: "i" } }],
        };

        const total = await Maintenance.countDocuments(query);
        const maintenance = await Maintenance.find(query)
            .populate("vehicle")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: maintenance,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const DeleteMaintenance = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Maintenance Id",
        });
    }
    try {
        const maintenance = await Maintenance.findById(id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found",
            });
        }

        if (maintenance.vehicle) {
            await Vehicle.findByIdAndUpdate(maintenance.vehicle, {
                status: "available",
                $pull: { maintenanceHistory: id },
            });
        }

        const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Maintenance record deleted successfully",
            data: deletedMaintenance,
        });
    } catch (error) {}
};

// In maintenance.controller.js
export const updateChecklistItem = async (req, res) => {
    try {
        const { id, itemIndex } = req.params;
        const { completedBy } = req.body; // Get completedBy from request body
        if (!completedBy) {
            return res.status(400).json({
                success: false,
                message: "CompletedBy field is required",
            });
        }
        // Find and populate the vehicle data
        let maintenance = await Maintenance.findById(id).populate("vehicle");

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found",
            });
        }

        if (!maintenance.checklist || itemIndex >= maintenance.checklist.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid checklist item index",
            });
        }

        // Toggle the completed status
        maintenance.checklist[itemIndex].completed = !maintenance.checklist[itemIndex].completed;

        if (maintenance.checklist[itemIndex].completed) {
            maintenance.checklist[itemIndex].completedAt = new Date();
            maintenance.checklist[itemIndex].completedBy = completedBy || "Unknown";
        } else {
            // If unchecking, remove the completedBy and completedAt
            maintenance.checklist[itemIndex].completedBy = undefined;
            maintenance.checklist[itemIndex].completedAt = undefined;
        }

        await maintenance.save();

        // Re-fetch with populated vehicle data to ensure we have the latest
        maintenance = await Maintenance.findById(id).populate("vehicle");

        res.json({
            success: true,
            data: maintenance,
            message: "Checklist item updated successfully",
        });
    } catch (error) {
        console.error("Update checklist error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating checklist item",
        });
    }
};

// export const UpdateMaintenance = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const maintenance = await Maintenance.findByIdAndUpdate(id, req.body, { new: true });
//         if (!maintenance) {
//             return res.status(404).json({ success: false, message: "Maintenance record not found" });
//         }
//         if (!maintenance.vehicle || !maintenance.maintenanceType || !maintenance.description || !maintenance.startDate || !maintenance.expectedEndDate) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const newMaintenance = new Maintenance(maintenance);
//         await newMaintenance.save();
//         res.status(200).json({ success: true, data: maintenance, message: "Maintenance record updated successfully" });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

export const UpdateMaintenance = async (req, res) => {
    const { id } = req.params;
    try {
        // First, get the original maintenance record
        const originalMaintenance = await Maintenance.findById(id);
        if (!originalMaintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found",
            });
        }

        // Update the maintenance record
        const maintenance = await Maintenance.findByIdAndUpdate(id, req.body, { new: true });

        // Validate required fields
        if (!maintenance.vehicle || !maintenance.maintenanceType || !maintenance.description || !maintenance.startDate || !maintenance.expectedEndDate) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Get today's date at midnight for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newStartDate = new Date(maintenance.startDate);
        newStartDate.setHours(0, 0, 0, 0);

        const originalStartDate = new Date(originalMaintenance.startDate);
        originalStartDate.setHours(0, 0, 0, 0);

        // If the maintenance was scheduled for today but has been moved to a future date
        if (originalStartDate.getTime() === today.getTime() && newStartDate.getTime() > today.getTime()) {
            // Get the vehicle
            const vehicle = await Vehicle.findById(maintenance.vehicle);

            if (vehicle) {
                // Reset vehicle status to its previous state
                const updatedStatus = vehicle.assignedDriver ? "in_use" : "available";

                // Update vehicle status
                await Vehicle.findByIdAndUpdate(maintenance.vehicle, {
                    status: updatedStatus,
                });

                // If there was a driver previously assigned
                if (vehicle.assignedDriver) {
                    // Restore driver's status and vehicle assignment
                    await Driver.findByIdAndUpdate(vehicle.assignedDriver, {
                        status: "assigned",
                        assignedVehicle: vehicle._id,
                    });
                }
            }

            // Update maintenance status back to "Scheduled"
            maintenance.status = "Scheduled";
            await maintenance.save();
        }

        res.status(200).json({
            success: true,
            data: maintenance,
            message: "Maintenance record updated successfully",
        });
    } catch (error) {
        console.error("Error updating maintenance:", error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
