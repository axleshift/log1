import mongoose from "mongoose";

const receivingSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        pickUpLocation: {
            type: String,
            required: true,
        },
        warehouseLocation: {
            type: String,
            required: true,
        },
        scheduledDate: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        weight: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "on_process", "received"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Receiving = mongoose.model("Receiving", receivingSchema);
export default Receiving;
