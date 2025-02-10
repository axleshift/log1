import mongoose from "mongoose";

const dispatchSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        itemsDelivered: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true,
        },
        scheduledDate: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        status: {
            type: String,
            enum: ["pending", "on_process", "delivered", "cancelled"],
            default: "pending",
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Dispatch = mongoose.model("Dispatch", dispatchSchema);
export default Dispatch;
