import mongoose from "mongoose";

const warehouseLocSchema = new mongoose.Schema(
    {
        warehouseName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
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

export default mongoose.model("WarehouseLoc", warehouseLocSchema);
