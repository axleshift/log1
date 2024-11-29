import mongoose from "mongoose";
import Vehicle from "./vehicle.models.js"; // Import Vehicle model
import Driver from "./driver.models.js"; // Import Driver model

const maintenanceInspectionSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "Cancelled"],
            default: "Pending",
        },
        scheduledDate: {
            type: Date,
            required: true,
        },
        inspector: {
            type: String,
            required: true,
        },

        visualInspection: {
            physical: {
                cracks: { type: Boolean, default: false },
                corrosion: { type: Boolean, default: false },
                wear: { type: Boolean, default: false },
                damage: { type: Boolean, default: false },
            },
            operational: {
                noise: { type: Boolean, default: false },
                leaks: { type: Boolean, default: false },
                misalignment: { type: Boolean, default: false },
                looseFasteners: { type: Boolean, default: false },
            },
            safety: {
                guards: { type: Boolean, default: false },
                emergencyStop: { type: Boolean, default: false },
                lockoutTagout: { type: Boolean, default: false },
                fireSafety: { type: Boolean, default: false },
            },
            mechanical: {
                bearings: {
                    play: { type: Boolean, default: false },
                    overheating: { type: Boolean, default: false },
                    metalShavings: { type: Boolean, default: false },
                },
                belts: {
                    tension: { type: Boolean, default: false },
                    wear: { type: Boolean, default: false },
                    damage: { type: Boolean, default: false },
                },
                motors: {
                    noise: { type: Boolean, default: false },
                    overheating: { type: Boolean, default: false },
                    looseConnections: { type: Boolean, default: false },
                },
            },
            electrical: {
                wiring: {
                    insulation: { type: Boolean, default: false },
                    termination: { type: Boolean, default: false },
                    overheating: { type: Boolean, default: false },
                },
                controlPanels: {
                    functionality: { type: Boolean, default: false },
                    labeling: { type: Boolean, default: false },
                    damage: { type: Boolean, default: false },
                },
            },
            fluidSystems: {
                lubrication: {
                    oilLevel: { type: Boolean, default: false },
                    lubrication: { type: Boolean, default: false },
                    cleanliness: { type: Boolean, default: false },
                },
                hydraulicFluid: {
                    level: { type: Boolean, default: false },
                    condition: { type: Boolean, default: false },
                    filter: { type: Boolean, default: false },
                },
            },
            documents: {
                registration: { type: Boolean, default: false },
                insurance: { type: Boolean, default: false },
            },
        },
    },
    {
        timestamps: true,
    }
);

maintenanceInspectionSchema.pre("save", async function (next) {
    const now = new Date();
    if (this.scheduledDate <= now && this.status === "Pending") {
        this.status = "In Progress";

        try {
            const vehicle = await Vehicle.findById(this.vehicleId);
            if (vehicle) {
                const driverName = vehicle.assignedDriver;

                vehicle.status = "inspection";
                vehicle.assignedDriver = null;
                await vehicle.save();
                const driver = await Driver.findOne({ licenseNumber: vehicle.licenseNumber });
                // const driver = await Driver.findOne(vehicle.licenseNumber);
                if (driver) {
                    driver.assignedVehicle = null;
                    await driver.save();
                }
            }
        } catch (error) {
            console.error("Error updating vehicle and driver:", error);
        }
    }

    next();
});

maintenanceInspectionSchema.statics.updatePendingMaintenances = async function () {
    const now = new Date();
    try {
        const pendingMaintenances = await this.find({
            status: "Pending",
            scheduledDate: { $lte: now },
        }).populate("vehicleId");

        let updatedCount = 0;

        for (const maintenance of pendingMaintenances) {
            maintenance.status = "In Progress";
            await maintenance.save();

            if (maintenance.vehicleId) {
                const vehicle = maintenance.vehicleId;
                const driverName = vehicle.assignedDriver;

                vehicle.status = "inspection";
                vehicle.assignedDriver = null;
                await vehicle.save();
                const driver = await Driver.findOne({ licenseNumber: vehicle.licenseNumber });
                // const driver = await Driver.findOne(vehicle.licenseNumber);
                if (driver) {
                    driver.assignedVehicle = null;
                    await driver.save();
                }
            }

            updatedCount++;
        }

        return updatedCount;
    } catch (error) {
        console.error("Error updating pending inspection ", error);
        throw error;
    }
};

maintenanceInspectionSchema.index({ scheduledDate: 1, status: 1 });

const Maintenance = mongoose.model("MaintenanceInspection", maintenanceInspectionSchema);

setInterval(
    async () => {
        try {
            const updatedCount = await Maintenance.updatePendingMaintenances();
            if (updatedCount > 0) {
                console.log(`Updated ${updatedCount} Inspsection records to In Progress`);
            }
        } catch (error) {
            console.error("Error in inspection status update interval:", error);
        }
    },
    5 * 60 * 1000
);

export default Maintenance;
