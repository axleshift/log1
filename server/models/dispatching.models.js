import mongoose from "mongoose";

const DispatchingSchema = new mongoose.Schema(
    {
        shipper: {
            company_name: { type: String, required: true },
            contact_name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        consignee: {
            company_name: { type: String, required: true },
            contact_name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        shipment: {
            description: { type: String, required: true },
            weight: { type: Number, required: true },
            dimension: {
                length: { type: Number, required: true },
                width: { type: Number, required: true },
                height: { type: Number, required: true },
            },
            tracking_id: { type: String, required: true },
            isInWarehouse: { type: Boolean, default: true },

            // paid: { type: String, default: "Paid" },
            // amount: { type: Number, required: true },
        },
        vehicle: {
            name: { type: String, required: true },
            plate_no: { type: String, required: true },
            driver_name: { type: String, required: true },
        },
        warehouse_id: { type: String },
        shipping: {
            shipping_type: {
                type: String,
                required: true,
            },
            shipping_details: {
                destination_address: { type: String },
                pickup_date: { type: Date },
                delivery_date: { type: Date },
                vehicle_type: { type: String },
                destination_airport: { type: String },
                preferred_departure_date: { type: Date },
                preferred_arrival_date: { type: Date },
                flight_type: { type: String },
                loading_port: { type: String },
                discharge_port: { type: String },
                sailing_date: { type: Date },
                estimated_arrival_date: { type: Date },
                cargo_type: { type: String },
            },
        },

        tracking_id: { type: String, required: true },
        receiveDate: { type: Date, default: Date.now },
        receiveBy: { type: String, required: true },
        photo: {
            type: String, // This will store the file path
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Dispatching", DispatchingSchema);
