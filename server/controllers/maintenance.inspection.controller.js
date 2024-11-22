import Vehicle from "../models/vehicle.models.js";
import Driver from "../models/driver.models.js";
import maintenanceInspection from "../models/maintenance.inspection.models.js";

// export const createMaintenanceInspection = async (req, res) => {
//     try {
//         const vehicle = await Vehicle.findById(req.body.vehicleId);
//         if (!vehicle) {
//             return res.status(404).json({ message: "Vehicle not found" });
//         }
//         const inspection = new maintenanceInspection(req.body);
//         await inspection.save();
//         const today = new Date();
//         if (inspection.scheduledDate.toDateString() === today.toDateString()) {
//             vehicle.assignedDriver = null;
//             vehicle.status = "maintenance";
//             const driver = await Driver.findById(vehicle.assignedDriver);
//             if (driver) {
//                 driver.assignedVehicle = null;
//                 await driver.save();
//             }
//             await vehicle.save();
//         }
//         res.status(201).json({ message: "Maintenance inspection created successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const createMaintenanceInspection = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.body.vehicleId);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }
        const existingInspection = await maintenanceInspection.findOne({ vehicleId: req.body.vehicleId, scheduledDate: { $gt: new Date() } });
        if (existingInspection) {
            return res.status(400).json({ success: false, message: "Vehicle is already scheduled for inspection" });
        }
        const inspection = new maintenanceInspection(req.body);
        await inspection.save();
        const today = new Date();
        if (inspection.scheduledDate.toDateString() === today.toDateString()) {
            vehicle.assignedDriver = null;
            vehicle.status = "maintenance";
            const driver = await Driver.findById(vehicle.assignedDriver);
            if (driver) {
                driver.assignedVehicle = null;
                await driver.save();
            }
            await vehicle.save();
        }
        res.status(201).json({ success: true, message: "Maintenance inspection created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMaintenanceInspection = async (req, res) => {
    try {
        const maintenances = await maintenanceInspection.find({}).populate("vehicleId");
        res.status(200).json({ success: true, data: maintenances });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
