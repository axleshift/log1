// server/controllers/maintenance.controller.js
import Maintenance from "../models/maintenance.models.js";
import Vehicle from "../models/vehicle.models.js";

export const createMaintenance = async (req, res) => {
    try {
        const maintenance = new Maintenance(req.body);

        // Update vehicle status and remove assigned driver
        await Vehicle.findByIdAndUpdate(req.body.vehicle, {
            status: "maintenance",
            assignedDriver: null,
        });

        await maintenance.save();
        res.status(201).json({ success: true, data: maintenance });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const completeMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            {
                status: "Completed",
                actualEndDate: new Date(),
                ...req.body,
            },
            { new: true }
        );

        // Update vehicle status back to available
        await Vehicle.findByIdAndUpdate(maintenance.vehicle, {
            status: "available",
        });

        res.json({ success: true, data: maintenance });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllMaintenance = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

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
