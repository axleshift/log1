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

        vehicleDetails: {
            brand: String,
            model: String,
            regisNumber: String,
            fuelType: String,
        },
        driverDetails: {
            driverName: String,
        },
        date: {
            type: Date,
            required: true,
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
        currentMileage: {
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
