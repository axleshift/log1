import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "manager", "inspector", "driver", "chief mechanic"],
            default: "user",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        photo: { type: String }, // Add this line
        isActive: {
            type: Boolean,
            default: true,
        },
        recaptchaScore: {
            type: Number,
            default: 0,
        },
        isLoggedIn: {
            type: Boolean,
            default: false,
        },

        lastLoginTime: {
            type: Date,
            default: null,
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
