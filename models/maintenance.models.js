import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema({
    task: String,
    completed: { type: Boolean, default: false },
    completedBy: String,
    completedAt: Date,
});

const maintenanceSchema = new mongoose.Schema(
    {
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        maintenanceType: {
            type: String,
            enum: ["PMS", "Corrective", "Emergency"],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        expectedEndDate: {
            type: Date,
            required: true,
        },
        actualEndDate: {
            type: Date,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
            default: "Scheduled",
        },

        purchased: { type: Boolean, default: false },

        requested: { type: Boolean, default: false },

        notes: String,
        completedBy: String,

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium",
        },

        category: {
            type: String,
            enum: ["Engine", "Transmission", "Brakes", "Electrical", "Tires", "Other"],
            required: true,
        },

        // attachments: [
        //     {
        //         filename: String,
        //         path: String,
        //         uploadedAt: Date,
        //         uploadedBy: String,
        //     },
        // ],

        checklist: [checklistItemSchema],

        parts: [
            {
                partName: String,
                quantity: Number,
                // unitCost: Number,
                // partTotalCost: Number,
            },
        ],
    },

    {
        timestamps: true,
    }
);

// Calculate total cost before saving
// maintenanceSchema.pre("save", function (next) {
//     let total = this.costs.laborCost;
//     total += this.costs.partsCost;
//     this.costs.additionalCosts.forEach((cost) => {
//         total += cost.amount;
//     });
//     this.totalCost = total;
//     next();
// });

export default mongoose.model("Maintenance", maintenanceSchema);
