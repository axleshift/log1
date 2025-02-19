import express from "express";
import { login, register, logout, refreshToken, getUser, inActiveUser, updateUser, getProfile, updateProfile } from "../../controllers/user.controller.js";
import { authenticate, authenticateAdmin } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
const router = express.Router();

router.post("/register", authenticate, authenticateAdmin, upload.single("photo"), register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/all-user", authenticate, getUser);
router.post("/in-active-user/:id", authenticate, inActiveUser);
router.put("/update-user/:id", authenticate, authenticateAdmin, upload.single("photo"), updateUser);
router.get("/profile", authenticate, getProfile);
router.put("/update-profile", authenticate, upload.single("photo"), updateProfile);

export default router;
