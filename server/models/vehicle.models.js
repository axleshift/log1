import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        idNum: {
            type: String,
            required: true,
            unique: true,
        },
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        regisNumber: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        assignedDriver: {
            type: mongoose.Schema.Types.String,
            ref: "Driver",
            default: null,
        },
        status: {
            type: String,
            enum: ["available", "in_use", "maintenance", "inactive"],
            default: "available",
        },
        sceduledMaintenance: {
            type: mongoose.Schema.Types.Date,
            ref: "Maintenance",
        },

        fuelType: { type: String, required: true },
        currentMileage: { type: Number, required: true },
        // currentLoad: {
        //     type: Number,
        //     default: 0,
        // },
        // lastMaintenance: {
        //     type: Date,
        //     default: Date.now,
        // },
        // nextMaintenance: {
        //     type: Date,
        //     required: true,
        // },
    },
    {
        timestamps: true,
    }
);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
