import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
    poNumber: {
        type: String,
        required: true,
        unique: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    receiveDate: {
        type: Date,
        required: true,
    },
    carrier: {
        type: String,
        required: true,
    },
    vendor: {
        businessName: {
            type: String,
            required: true,
        },
        businessAddress: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
    },
    // shipTo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Location",
    // },
    details: [
        {
            // productId: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'Product',
            //     required: true
            // },
            description: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WarehouseLoc",
        required: true,
    },
    warehouseLocDetails: {
        warehouseName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    // procurementId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Procurement'
    // },
    // rfqId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'RFQ'
    // },
    // vendorId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Vendor'
    // },
    additionalNotes: {
        type: String,
    },
    byReceived: {
        type: String,
        required: true,
    },
    dateOfReceived: {
        type: Date,
        required: true,
    },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
export default Warehouse;
