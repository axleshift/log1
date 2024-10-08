import express from "express";
import { registerUser, loginUser, getUser, userLogout } from "../controllers/user.controller.js";
import varify from "../middleWare/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", varify, getUser);
router.get("/logout", userLogout);

export default router;
