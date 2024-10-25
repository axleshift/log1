import express from "express";
import vehicleRouter from "../../routes/v1/vehicle.routes.js";
import driverRouter from "../../routes/v1/driver.routes.js";
import userRouter from "../../routes/v1/user.router.js";
import { protectRoute } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use("/vehicle", protectRoute, vehicleRouter);
router.use("/driver", protectRoute, driverRouter);
router.use("/user", userRouter);

export default router;
