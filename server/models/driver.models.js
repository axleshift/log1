import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
    {
        idNum: {
            type: String,
            required: true,
        },
        driverName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        licenseNumber: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["available", "on_duty", "off_duty"],
            default: "available",
        },

        assignedVehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            default: null,
        },
        documents: [
            {
                type: { type: String },
                number: String,
                expiryDate: Date,
            },
        ],
    },
    {
        timestamps: true,
    }
);
const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
