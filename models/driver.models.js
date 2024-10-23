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
    },
    {
        timestamps: true,
    }
);
const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
