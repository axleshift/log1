import express from "express";
import { createReceiving, getReceiving } from "../../controllers/receiving.controller.js";

const router = express.Router();

router.post("/add", createReceiving);
router.get("/all", getReceiving);

export default router;
