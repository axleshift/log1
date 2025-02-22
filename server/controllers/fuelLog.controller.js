import FuelLog from "../models/fuelLog.models.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const createFuelLog = async (req, res) => {
    try {
        // Validate required fields from the request body
        const { vehicleId, driverId, receiptNumber, fuelQuantity, fuelType, costPerLiter, totalCost, odometerReading, route, notes, litersPer100km, kmPerLiter, mpg } = req.body;

        if (!vehicleId || !driverId || !fuelQuantity || !receiptNumber) {
            if (req.file) {
                try {
                    const filePath = path.join(__dirname, "../uploads/receipts", req.file.filename);
                    await fs.unlink(filePath);
                } catch (err) {
                    console.error("Error deleting uploaded file:", err);
                }
            }

            return res.status(400).json({
                success: false,
                message: "Vehicle, driver, and fuel quantity are required fields",
            });
        }

        const existingFuelLog = await FuelLog.findOne({ receiptNumber });
        if (existingFuelLog) {
            if (existingFuelLog.vehicleId.toString() === vehicleId) {
                return res.status(400).json({
                    success: false,
                    message: "Receipt number already exists for this vehicle",
                });
            }
            if (req.file) {
                try {
                    const filePath = path.join(__dirname, "../uploads/receipts", req.file.filename);
                    await fs.unlink(filePath);
                } catch (error) {
                    console.error("Error deleting uploaded file:", error);
                }
            }
            return res.status(400).json({
                success: false,
                message: "Receipt number already exists",
            });
        }
        let photoFilename = null;
        if (req.file) {
            try {
                photoFilename = req.file.filename;
            } catch (error) {
                console.error("Error handling photo:", error);
            }
        }

        // Create new fuel log instance
        const fuelLog = new FuelLog({
            vehicleId,
            driverId,
            receiptNumber,
            fuelQuantity,
            // fuelType: fuelType || "",
            // costPerLiter: costPerLiter || 0,
            // totalCost: totalCost || 0,
            // odometerReading: odometerReading || 0,
            // receiptImage: photoFilename,
            // route: route || { start: "", end: "", distance: "" },
            // notes: notes || "",
            fuelType,
            costPerLiter,
            totalCost,
            odometerReading,
            receiptImage: photoFilename,
            route,
            notes,
            litersPer100km,
            kmPerLiter,
            mpg,
        });

        // Save the fuel log
        const savedFuelLog = await fuelLog.save();

        // Return success response
        res.status(201).json({
            success: true,
            data: savedFuelLog,
            message: "Fuel log created successfully",
        });
    } catch (error) {
        // Handle specific validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors)
                    .map((err) => err.message)
                    .join(", "),
            });
        }
        if (req.file) {
            try {
                const filePath = path.join(__dirname, "../uploads/receipts", req.file.filename);
                await fs.unlink(filePath);
            } catch (err) {
                console.error("Error deleting uploaded file:", err);
            }
        }

        // Handle other errors
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getFuelLogs = async (req, res) => {
    try {
        const fuelLogs = await FuelLog.find().populate("vehicleId").populate("driverId").sort("-date");
        res.status(200).json({ success: true, data: fuelLogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteFuelLog = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the fuel log first to get the receipt image filename
        const fuelLog = await FuelLog.findById(id);

        if (!fuelLog) {
            return res.status(404).json({
                success: false,
                message: "Fuel log not found",
            });
        }

        // If there's a receipt image, try to delete it
        if (fuelLog.receiptImage) {
            try {
                // Check both possible paths (adjust these paths according to your setup)
                const possiblePaths = [path.join(__dirname, "../uploads/receipts", fuelLog.receiptImage), path.join(__dirname, "../../uploads/receipts", fuelLog.receiptImage), path.join(process.cwd(), "uploads/receipts", fuelLog.receiptImage)];

                for (const filePath of possiblePaths) {
                    try {
                        // Check if file exists before attempting to delete
                        await fs.access(filePath);
                        await fs.unlink(filePath);

                        break; // Exit loop if deletion is successful
                    } catch (err) {
                        if (err.code !== "ENOENT") {
                            console.error(`Error with path ${filePath}:`, err);
                        }
                        // Continue to next path if file doesn't exist
                    }
                }
            } catch (err) {
                // Log error but continue with database record deletion
                console.error("Error handling receipt image deletion:", err);
            }
        }

        // Delete the fuel log from the database
        await FuelLog.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Fuel log deleted successfully",
        });
    } catch (error) {
        console.error("Delete operation error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateFuelLog = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Check if fuel log exists
        const fuelLog = await FuelLog.findById(id);
        if (!fuelLog) {
            return res.status(404).json({
                success: false,
                message: "Fuel log not found",
            });
        }

        // Handle file upload if there's a new receipt
        if (req.file) {
            // Delete old receipt if it exists
            if (fuelLog.receiptImage) {
                try {
                    const filePath = path.join(__dirname, "../uploads/receipts", fuelLog.receiptImage);
                    await fs.unlink(filePath);
                } catch (err) {
                    console.error("Error deleting old receipt:", err);
                }
            }
            updates.receiptImage = req.file.filename;
        }

        // Update the fuel log
        const updatedFuelLog = await FuelLog.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({
            success: true,
            data: updatedFuelLog,
            message: "Fuel log updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getFuelAnalytics = async (req, res) => {
    try {
        const { vehicleId, startDate, endDate } = req.query;

        const query = {};
        if (vehicleId) query.vehicleId = vehicleId;
        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const fuelLogs = await FuelLog.find(query);

        // Calculate analytics
        const analytics = {
            totalFuelConsumption: 0,
            averageFuelConsumption: 0,
            totalCost: 0,
            numberOfRefills: fuelLogs.length,
        };

        fuelLogs.forEach((log) => {
            analytics.totalFuelConsumption += log.fuelQuantity;
            analytics.totalCost += log.totalCost;
        });

        analytics.averageFuelConsumption = analytics.totalFuelConsumption / analytics.numberOfRefills;

        res.status(200).json({ success: true, data: analytics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
