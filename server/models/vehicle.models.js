import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
