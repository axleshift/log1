import mongoose from "mongoose";

const maintenanceInspectionSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "Cancelled"],
            default: "Pending",
        },
        description: {
            type: String,
            required: true,
        },
        scheduledDate: {
            type: Date,
            required: true,
        },

        inspector: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const Maintenance = mongoose.model("MaintenanceInspection", maintenanceInspectionSchema);
export default Maintenance;
