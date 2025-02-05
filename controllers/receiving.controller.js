import Receiving from "../models/receiving.models.js";
import Vehicle from "../models/vehicle.models.js";

export const addReceivingSchedule = async (req, res) => {
    const { vehicleId, pickUpLocation, warehouseLocation, scheduledDate, weight } = req.body;

    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle || vehicle.status !== "in_use") {
            return res.status(400).json({ success: false, message: "Invalid vehicle or vehicle not in use" });
        }

        if (weight > vehicle.capacity) {
            return res.status(400).json({ success: false, message: "Weight exceeds vehicle capacity" });
        }

        const newReceiving = new Receiving({
            vehicleId,
            pickUpLocation,
            warehouseLocation,
            scheduledDate,
            weight,
        });

        await newReceiving.save();
        res.status(201).json({ success: true, data: newReceiving });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getVehiclesInUse = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ status: "in_use" });
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
