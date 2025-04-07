import express from "express";
import { createReceiving, getReceiving } from "../../controllers/dispatching.controller.js";
import { dispatchReceipts } from "../../middleware/upload.js";
const router = express.Router();

router.post("/add", dispatchReceipts.single("photo"), createReceiving);
router.get("/all", getReceiving);

export default router;
