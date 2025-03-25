import Warehouse from "../models/warehouse.models.js";
import mongoose from "mongoose";

// export const addWarehouseItem = async (req, res) => {
//     const { poNumber, orderDate, receiveDate, carrier, vendor, shipTo, details, procurementId, rfqId, vendorId, additionalNotes, byReceived, dateOfReceived, warehouse, warehouseLocDetails } = req.body;

//     // Validate required fields
//     if (!poNumber || !orderDate || !receiveDate || !carrier || !vendor || !details) {
//         return res.status(400).json({
//             success: false,
//             message: "Required fields are missing",
//         });
//     }

//     // Validate vendor information
//     if (!vendor.businessName || !vendor.businessAddress || !vendor.contactNumber) {
//         return res.status(400).json({
//             success: false,
//             message: "Complete vendor information is required",
//         });
//     }

//     // Validate details array
//     if (!Array.isArray(details) || details.length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: "Products details must be a non-empty array",
//         });
//     }

//     // Validate each product detail
//     const isValidDetails = details.every((detail) => detail.productId && detail.description && detail.quantity && detail.unitPrice && detail.subTotal);

//     if (!isValidDetails) {
//         return res.status(400).json({
//             success: false,
//             message: "Each product must have complete details",
//         });
//     }

//     // Check if PO number already exists
//     const existingPoNumber = await Warehouse.findOne({ poNumber });
//     if (existingPoNumber) {
//         return res.status(400).json({
//             success: false,
//             message: "PO number already exists",
//         });
//     }

//     // Create new warehouse item
//     const newWarehouseItem = new Warehouse({
//         poNumber,
//         orderDate,
//         receiveDate,
//         carrier,
//         vendor: {
//             businessName: vendor.businessName,
//             businessAddress: vendor.businessAddress,
//             contactNumber: vendor.contactNumber,
//         },
//         warehouse,
//         warehouseLocDetails: {
//             warehouseName: warehouseDetails.warehouseName,
//             address: warehouseDetails.address,
//         },
//         details: details.map((detail) => ({
//             productId: detail.productId,
//             description: detail.description,
//             quantity: detail.quantity,
//             unitPrice: detail.unitPrice,
//             subTotal: detail.subTotal,
//         })),
//         // procurementId,
//         // rfqId,
//         // vendorId,
//         additionalNotes,
//         byReceived,
//         dateOfReceived,
//     });

//     try {
//         const savedItem = await newWarehouseItem.save();
//         return res.status(201).json({
//             success: true,
//             message: "Receiving item added successfully",
//             data: savedItem,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

export const addWarehouseItem = async (req, res) => {
    const { poNumber, orderDate, receiveDate, carrier, vendor, details, warehouse, additionalNotes, byReceived, dateOfReceived } = req.body;

    // Validate required fields
    if (!poNumber || !orderDate || !receiveDate || !carrier || !vendor || !details || !warehouse) {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing",
        });
    }

    try {
        // Find the warehouse details
        const warehouseDetails = await mongoose.model("WarehouseLoc").findById(warehouse);

        if (!warehouseDetails) {
            return res.status(404).json({
                success: false,
                message: "Warehouse not found",
            });
        }

        // Create new warehouse item with explicit warehouseLocDetails
        const newWarehouseItem = new Warehouse({
            poNumber,
            orderDate,
            receiveDate,
            carrier,
            vendor: {
                businessName: vendor.businessName,
                businessAddress: vendor.businessAddress,
                contactNumber: vendor.contactNumber,
            },
            warehouse, // Reference to the warehouse
            warehouseLocDetails: {
                warehouseName: warehouseDetails.warehouseName,
                address: warehouseDetails.address,
            },
            details: details.map((detail) => ({
                productId: detail.productId,
                description: detail.description,
                quantity: detail.quantity,
            })),
            additionalNotes,
            byReceived,
            dateOfReceived,
        });

        const savedItem = await newWarehouseItem.save();
        return res.status(201).json({
            success: true,
            message: "Receiving item added successfully",
            data: savedItem,
        });
    } catch (error) {
        console.error("Error in addWarehouseItem:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getWarehouseItems = async (req, res) => {
    try {
        const warehouseItems = await Warehouse.find().sort({ createdAt: -1 }).populate("warehouse");
        return res.status(200).json({ success: true, data: warehouseItems });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteWarehouseItem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid id" });
    }
    try {
        await Warehouse.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateWarehouseItem = async (req, res) => {
    const { id } = req.params;
    const warehouse = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid id" });
    }

    try {
        const updatedWarehouseItem = await Warehouse.findByIdAndUpdate(id, warehouse, { new: true });
        return res.status(200).json({ success: true, data: updatedWarehouseItem, message: "Item updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// export const checkIfPoNumberExists = async (req, res) => {
//     const poNumber = req.params.poNumber;
//     const exists = await Warehouse.exists({ PoNumber: poNumber });
//     res.json({ exists });
// };

export const checkIfPoNumberExists = async (req, res) => {
    try {
        const { poNumber } = req.params;
        const existingPo = await Warehouse.findOne({ poNumber });

        return res.status(200).json({
            success: true,
            exists: !!existingPo,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Warehouse.aggregate([
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "warehouselocs",
                    localField: "warehouse",
                    foreignField: "_id",
                    as: "warehouseDetails",
                },
            },
            {
                $addFields: {
                    warehouseInfo: {
                        $cond: {
                            if: { $gt: [{ $size: "$warehouseDetails" }, 0] },
                            then: { $arrayElemAt: ["$warehouseDetails", 0] },
                            else: {
                                warehouseName: "$warehouseLocDetails.warehouseName",
                                address: "$warehouseLocDetails.address",
                                deleted: true, // Mark as deleted since it's not in warehouselocs collection
                            },
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$items.itemName",
                    itemName: { $first: "$items.itemName" },
                    quantity: { $sum: "$items.quantity" },
                    locations: {
                        $addToSet: {
                            warehouse: "$warehouseInfo",
                            quantity: "$items.quantity",
                        },
                    },
                },
            },
            { $sort: { itemName: 1 } },
        ]);

        return res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch (err) {
        console.error("Error in getAllItems:", err);
        return res.status(500).json({
            success: false,
            message: "Error fetching items",
            error: err.message,
        });
    }
};
