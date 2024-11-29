import Vehicle from "../models/vehicle.models.js";
import Maintenance from "../models/maintenance.inspection.models.js";
import mongoose from "mongoose";

export const createMaintenanceInspection = async (req, res) => {
    try {
        const maintenance = new Maintenance(req.body);
        if (!maintenance.vehicleId || !maintenance.scheduledDate || !maintenance.inspector) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        await maintenance.save();

        res.status(201).json({
            success: true,
            data: maintenance,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMaintenanceInspection = async (req, res) => {
    try {
        await Maintenance.updatePendingMaintenances();

        const maintenances = await Maintenance.find({})
            .populate({
                path: "vehicleId",
                match: { _id: { $exists: true } },
            })
            .sort({ scheduledDate: -1 });

        const processedMaintenances = maintenances.map((maintenance) => ({
            ...maintenance.toObject(),
            vehicleDeleted: !maintenance.vehicleId,
            vehicleId: maintenance.vehicleId || "Vehicle Deleted",
        }));

        res.status(200).json({
            success: true,
            data: processedMaintenances,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteMaintenanceInspection = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: "Maintenance inspection not found",
            });
        }

        if (maintenance.vehicleId) {
            const vehicle = await Vehicle.findById(maintenance.vehicleId);
            if (vehicle) {
                if (vehicle.status === "inspection") {
                    vehicle.status = "available";
                    await vehicle.save({ session });
                }
            }
        }
        await Maintenance.findByIdAndDelete(req.params.id).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Maintenance inspection deleted successfully",
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error("Error in deleteMaintenanceInspection:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting maintenance inspection: " + error.message,
        });
    }
};

export const updateMaintenanceInspection = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Inspection ID is required",
            });
        }

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Update data is required",
            });
        }

        const currentInspection = await Maintenance.findById(id);

        const currentDate = new Date();
        const scheduledDate = new Date(currentInspection.scheduledDate);

        if (currentDate < scheduledDate) {
            return res.status(400).json({
                success: false,
                message: "Cannot update inspection before scheduled date",
            });
        }

        const areAllChecked = (obj) => {
            return Object.keys(obj).every((key) => {
                if (typeof obj[key] === "object") {
                    return areAllChecked(obj[key]);
                }
                return obj[key] === true;
            });
        };

        const isAnyChecked = (obj) => {
            return Object.keys(obj).some((key) => {
                if (typeof obj[key] === "object") {
                    return isAnyChecked(obj[key]);
                }
                return obj[key] === true;
            });
        };
        d;
        const isCompleted = areAllChecked(updates.visualInspection);
        const hasCheckedItems = isAnyChecked(updates.visualInspection);

        let status;
        let vehicleStatus;

        if (isCompleted) {
            status = "Completed";
            vehicleStatus = "available";
        } else if (hasCheckedItems) {
            status = "In Progress";
            vehicleStatus = "maintenance";
        } else {
            status = "Pending";
            vehicleStatus = "maintenance";
        }

        const updatedInspection = await Maintenance.findByIdAndUpdate(
            id,
            {
                $set: {
                    visualInspection: updates.visualInspection,
                    status: status,
                    lastUpdated: new Date(),
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedInspection) {
            return res.status(404).json({
                success: false,
                message: "Maintenance inspection not found",
            });
        }

        if (updatedInspection.vehicleId) {
            await Vehicle.findByIdAndUpdate(
                updatedInspection.vehicleId,
                {
                    $set: {
                        status: vehicleStatus,
                        lastMaintenanceDate: isCompleted ? new Date() : undefined,
                    },
                },
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            data: updatedInspection,
            message: `Maintenance inspection updated successfully and vehicle status updated to ${vehicleStatus}`,
        });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating maintenance inspection",
            error: error.message,
        });
    }
};
