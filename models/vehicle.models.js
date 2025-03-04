import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    date: {
        type: Date,
    },
});
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
        regisExprationDate: {
            type: Date,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
        },
        currentLoad: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["available", "in_use", "maintenance", "inactive", "inspection", "forRegistration"],
            default: "available",
        },
        sceduledMaintenance: {
            type: mongoose.Schema.Types.Date,
            ref: "Maintenance",
        },

        fuelType: { type: String, required: true },
        currentMileage: { type: Number, required: true },
        createdBy: [userSchema],
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
vehicleSchema.pre("remove", async function (next) {
    await Maintenance.deleteMany({ vehicleId: this._id });
    next();
});
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
