// import mongoose from "mongoose";

// const ShipmentSchema = new mongoose.Schema(
//     {
//         receiveDate: { type: Date, required: true },
//         isInWarehouse: { type: Boolean, required: true },
//         dispatch: {
//             type: String,
//             enum: ["Pending", "Dispatching", "Completed"],
//             default: "Pending",
//             required: true,
//         },
//         type: {
//             type: String,
//             enum: ["public", "private", "business"],
//             default: "public",
//             required: true,
//         },
//         paid: {
//             type: String,
//             enum: ["Unpaid", "Paid", "Void"],
//             default: "Unpaid",
//             required: true,
//         },
//         amount: { type: Number },
//         warehouse_id: { type: String },
//         country: { type: String },
//         items: { type: Number },

//         shipper: {
//             shipper_company_name: { type: String, required: true },
//             shipper_contact_name: { type: String, required: true },
//             shipper_contact_email_address: { type: String, required: true },
//             shipper_contact_phone_number: { type: String, required: true },
//             shipper_company_address: { type: String, required: true },
//         },

//         consignee: {
//             consignee_company_name: { type: String, required: true },
//             consignee_contact_name: { type: String, required: true },
//             consignee_contact_email_address: { type: String, required: true },
//             consignee_contact_phone_number: { type: String, required: true },
//             consignee_company_address: { type: String, required: true },
//         },

//         shipment: {
//             shipment_description: { type: String, required: true },
//             shipment_weight: { type: Number, required: true },
//             shipment_dimension_length: { type: Number, required: true },
//             shipment_dimension_width: { type: Number, required: true },
//             shipment_dimension_height: { type: Number, required: true },
//             shipment_volume: { type: Number },
//             shipment_value: { type: Number, required: true },
//             shipment_instructions: { type: String, required: true },
//         },

//         vehicle: {
//             name: { type: String },
//             plate_no: { type: String },
//             driver_name: { type: String },
//         },

//         shipping: {
//             shipping_type: {
//                 type: String,
//                 required: true,
//                 enum: ["air", "land", "sea"],
//             },
//             shipping_details: {
//                 origin_address: { type: String },
//                 destination_address: { type: String },
//                 pickup_date: { type: Date },
//                 delivery_date: { type: Date },
//                 vehicle_type: { type: String },
//                 origin_airport: { type: String },
//                 destination_airport: { type: String },
//                 preferred_departure_date: { type: Date },
//                 preferred_arrival_date: { type: Date },
//                 flight_type: { type: String },
//                 loading_port: { type: String },
//                 discharge_port: { type: String },
//                 sailing_date: { type: Date },
//                 estimated_arrival_date: { type: Date },
//                 cargo_type: { type: String },
//             },
//         },

//         tracking_id: { type: String, required: true, unique: true },

//         receiveDate: { type: Date, required: true },
//         receiveBy: { type: String, required: true },
//     },
//     { timestamps: true }
// );

// export default mongoose.model("Shipment", ShipmentSchema);

import mongoose from "mongoose";

const ShipmentSchema = new mongoose.Schema(
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
            type: { type: String, required: true },
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

export default mongoose.model("Shipment", ShipmentSchema);
