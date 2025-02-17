import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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
        enum: ["user", "admin", "manager", "inspector"],
        default: "user",
        required: true,
    },
    refreshToken: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    photo: { type: String }, // Add this line
});

const User = mongoose.model("User", userSchema);
export default User;
