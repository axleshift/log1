import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import Dispatch from "../models/dispatching.models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createReceiving = async (req, res) => {
    try {
        const dispatchData = JSON.parse(req.body.data);

        // Handle photo upload
        let photoFilename = null;
        if (req.file) {
            try {
                photoFilename = req.file.filename;
            } catch (error) {
                console.error("Error handling photo:", error);
            }
        }

        // Add the photo filename to receiving data
        dispatchData.photo = photoFilename;

        const newDispatch = new Dispatch(dispatchData);
        const savedDispatch = await newDispatch.save();

        res.status(201).json({
            success: true,
            data: savedDispatch,
            message: "Dispatching record created successfully",
        });
    } catch (error) {
        // If there's an error and a file was uploaded, delete it
        if (req.file) {
            try {
                const filePath = path.join(__dirname, "../uploads/dispatchReceipts", req.file.filename);
                await fs.unlink(filePath);
            } catch (err) {
                console.error("Error deleting uploaded file:", err);
            }
        }

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateReceiving = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = JSON.parse(req.body.data);

        // Check if receiving exists
        const dispatch = await Dispatch.findById(id);
        if (!dispatch) {
            return res.status(404).json({
                success: false,
                message: "Dispatching record not found",
            });
        }

        // Handle file upload if there's a new photo
        if (req.file) {
            // Delete old photo if it exists
            if (dispatch.photo) {
                try {
                    const filePath = path.join(__dirname, "../uploads/dispatchReceipts", dispatch.photo);
                    await fs.unlink(filePath);
                } catch (err) {
                    console.error("Error deleting old photo:", err);
                }
            }
            updates.photo = req.file.filename;
        }

        // Update the receiving record
        const updatedDispatch = await Dispatch.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        res.status(200).json({
            success: true,
            data: updatedDispatch,
            message: "Dispatching record updated successfully",
        });
    } catch (error) {
        // Clean up uploaded file if there's an error
        if (req.file) {
            try {
                const filePath = path.join(__dirname, "../uploads/dispatchReceipts", req.file.filename);
                await fs.unlink(filePath);
            } catch (err) {
                console.error("Error deleting uploaded file:", err);
            }
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteReceiving = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the receiving record first to get the photo filename
        const dispatching = await Dispatch.findById(id);

        if (!dispatching) {
            return res.status(404).json({
                success: false,
                message: "Dispatching record not found",
            });
        }

        // If there's a photo, try to delete it
        if (dispatching.photo) {
            try {
                const possiblePaths = [path.join(__dirname, "../uploads/dispatchReceipts", dispatching.photo), path.join(__dirname, "../../uploads/dispatchReceipts", dispatching.photo), path.join(process.cwd(), "uploads/dispatchReceipts", dispatching.photo)];

                for (const filePath of possiblePaths) {
                    try {
                        await fs.access(filePath);
                        await fs.unlink(filePath);
                        break; // Exit loop if deletion is successful
                    } catch (err) {
                        if (err.code !== "ENOENT") {
                            console.error(`Error with path ${filePath}:`, err);
                        }
                    }
                }
            } catch (err) {
                console.error("Error handling photo deletion:", err);
            }
        }

        // Delete the receiving record from the database
        await Receiving.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Receiving record deleted successfully",
        });
    } catch (error) {
        console.error("Delete operation error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getReceiving = async (req, res) => {
    try {
        const dispatching = await Dispatch.find({}).sort({ receiveDate: -1 }).select({
            shipment: 1,
            shipper: 1,
            consignee: 1,
            vehicle: 1,
            warehouse_id: 1,
            receiveDate: 1,
            receiveBy: 1,
            photo: 1,
            shipping: 1,
        });

        res.status(200).json({
            success: true,
            message: "Dispatching records retrieved successfully",
            data: dispatching,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
