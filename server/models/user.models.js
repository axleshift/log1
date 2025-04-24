// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//         role: {
//             type: String,
//             enum: ["user", "admin", "manager", "inspector", "driver", "chief mechanic"],
//             default: "user",
//             required: true,
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//         },
//         photo: { type: String }, // Add this line
//         isActive: {
//             type: Boolean,
//             default: true,
//         },
//         recaptchaScore: {
//             type: Number,
//             default: 0,
//         },
//         isLoggedIn: {
//             type: Boolean,
//             default: false,
//         },

//         lastLoginTime: {
//             type: Date,
//             default: null,
//         },
//         loginAttempts: {
//             type: Number,
//             default: 0,
//         },
//         lockUntil: {
//             type: Date,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
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
            enum: ["super admin", "admin", "manager", "warehouse manager", "fleet manager", "chief mechanic", "scheduler", "receiving clerk"],
            default: "manager",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        photo: {
            type: String,
        },
        verificationCode: {
            type: String,
            default: null,
        },
        verificationCodeExpires: {
            type: Date,
            default: null,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
        },
        lastLoginTime: {
            type: Date,
        },
        refreshToken: {
            type: String,
        },
        recaptchaScore: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);
export default User;
