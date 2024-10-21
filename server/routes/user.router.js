import express from "express";
import { register, login, logout } from "../controllers/user.controller.js";
import { isAuth, isAdmin, protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

// router.use(isAuth);
router.post("/register", protectRoute, register);
router.post("/login", login);
router.post("/logout", protectRoute, logout);

export default router;
