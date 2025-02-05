import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        itemName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        length: {
            type: Number,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        dateArrival: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        category: {
            type: String,
            required: true,
        },
        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WarehouseLoc",
            required: true,
        },
        status: {
            type: String,
            enum: ["Queued", "on_process", "dispatched", "cancelled"],
            default: "Queued",
            required: true,
        },
        byReceived: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
const Warehouse = mongoose.model("Warehouse", warehouseSchema);
export default Warehouse;
