import express from "express";
import { createReceiving, getReceiving } from "../../controllers/receiving.controller.js";
import { uploadPickUpReceipts } from "../../middleware/upload.js";
const router = express.Router();

router.post("/add", uploadPickUpReceipts.single("photo"), createReceiving);
router.get("/all", getReceiving);

export default router;
