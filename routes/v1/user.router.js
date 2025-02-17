import express from "express";
import { login, register, logout, refreshToken, getUser, upload } from "../../controllers/user.controller.js";
import { authenticate, authenticateAdmin } from "../../middleware/auth.js";
const router = express.Router();

router.post("/register", authenticate, authenticateAdmin, upload.single("photo"), register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/all-user", authenticate, getUser);

export default router;
