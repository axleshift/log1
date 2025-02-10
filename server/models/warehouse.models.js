import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const warehouseSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        dateArrival: {
            type: Date,
            required: true,
            default: Date.now(),
        },

        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WarehouseLoc",
            required: true,
        },
        items: [itemSchema], // Add the array of items
        byReceived: {
            type: String,
            required: true,
        },
        PoNumber: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;
