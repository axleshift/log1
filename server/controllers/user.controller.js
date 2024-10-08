import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ success: false, message: "Invalid user data" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // check if user email
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({ email: email }, process.env.JWT_ACCESTOKEN, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign({ email: email }, process.env.JWT_REFRESHTOKEN, {
            expiresIn: "30d",
        });
        res.cookie("accessToken", accessToken, { maxAge: 900000 });
        res.cookie("refreshToken", refreshToken, { maxAge: 2592000000, httpOnly: true, secure: true, sameSite: "strict" });
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            Login: true,
            // accessToken,
            // refreshToken,
        });
    } else {
        res.status(400).json({ Login: false, message: "Invalid credentials" });
    }
};
export const getUser = async (req, res) => {
    return res.json({ valid: true, message: "User is valid" });
};

export const userLogout = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ valid: false, message: "Logout succesfully" });
};

// const varify = (req, res, next) => {
//     const accessToken = req.cookies.accessToken;
//     if (renewToken(req, res)) {
//         next();
//     }
//     if (!accessToken) {
//     } else {
//         jwt.verify(accessToken, process.env.JWT_ACCESTOKEN, (err, decoded) => {
//             if (err) {
//                 return res.json({ valid: false, message: "Invalid token" });
//             } else {
//                 req.email = decoded.email;
//                 next();
//             }
//         });
//     }
// };

// const renewToken = (req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     let exist = false;
//     if (!refreshToken) {
//         return res.json({ valid: false, message: "No refresh token" });
//     } else {
//         jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN, (err, decoded) => {
//             if (err) {
//                 return res.json({ valid: false, message: "Invalid Refresh token" });
//             } else {
//                 const accessToken = jwt.sign({ email: email }, process.env.JWT_ACCESTOKEN, {
//                     expiresIn: "1m",
//                 });
//                 res.cookie("accessToken", accessToken, { maxAge: 60000 });
//                 exist = true;
//             }
//         });
//     }
//     return exist;
// };
// generate token
// function generateToken(id) {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: "30d",
//     });
// }
