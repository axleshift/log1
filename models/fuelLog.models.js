import mongoose from "mongoose";
const fuelLogSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        fuelQuantity: {
            type: Number,
            required: true,
        },
        fuelType: {
            type: String,
        },
        costPerLiter: {
            type: Number,
            required: true,
        },
        totalCost: {
            type: Number,
            required: true,
        },
        odometerReading: {
            type: Number,
            required: true,
        },
        receiptImage: {
            type: String, // URL to stored image
            required: true,
        },
        route: {
            start: String,
            end: String,
            distance: Number,
        },
        notes: String,
        litersPer100km: String,
        kmPerLiter: String,
        mpg: String,
    },
    { timestamps: true }
);

export default mongoose.model("FuelLog", fuelLogSchema);
