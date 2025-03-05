// server/models/inventoryPart.models.js
import mongoose from "mongoose";

const inventoryPartSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        partNumber: { type: String, required: true, unique: true },
        description: String,
        category: String,
        currentStock: { type: Number, default: 0 },
        minimumStock: { type: Number, default: 5 },
        unitCost: Number,
        location: String,
        supplier: {
            name: String,
            contact: String,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("InventoryPart", inventoryPartSchema);
