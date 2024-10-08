import jwt from "jsonwebtoken";

const varify = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
        if (renewToken(req, res)) {
            next();
        }
    } else {
        jwt.verify(accesstoken, process.env.JWT_ACCESTOKEN, (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" });
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};

// const renewToken = (req, res) => {
//     const refreshtoken = req.cookies.refreshToken;
//     let exist = false;
//     if (!refreshtoken) {
//         return res.json({ valid: false, message: "No Refresh token" });
//     } else {
//         jwt.verify(refreshtoken, process.env.JWT_REFRESHTOKEN, (err, decoded) => {
//             if (err) {
//                 return res.json({ valid: false, message: "Invalid Refresh Token" });
//             } else {
//                 const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESTOKEN, { expiresIn: "1m" });
//                 res.cookie("accessToken", accessToken, { maxAge: 60000 });
//                 exist = true;
//             }
//         });
//     }
//     return exist;
// };

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    let exist = false;
    if (!refreshtoken) {
        res.json({ valid: false, message: "No Refresh token" });
        exist = false;
    } else {
        jwt.verify(refreshtoken, process.env.JWT_REFRESHTOKEN, (err, decoded) => {
            if (err) {
                res.json({ valid: false, message: "Invalid Refresh Token" });
                exist = false;
            } else {
                const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESTOKEN, { expiresIn: "15m" });
                res.cookie("accessToken", accessToken, { maxAge: 60000 });
                exist = true;
            }
        });
    }
    return exist;
};

export default varify;
