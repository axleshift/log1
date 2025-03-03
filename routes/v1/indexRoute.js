import express from "express";
import vehicleRouter from "../../routes/v1/vehicle.routes.js";
import driverRouter from "../../routes/v1/driver.routes.js";
import userRouter from "../../routes/v1/user.router.js";
import receivingRouter from "../../routes/v1/receiving.routes.js";
import warehouseRouter from "../../routes/v1/warehouse.router.js";
import warehouseLocRouter from "../../routes/v1/warehouseLoc.router.js";
import fuelLogRouter from "../../routes/v1/fuelLog.routes.js";
import { authenticate, authenticateUser } from "../../middleware/auth.js";

const router = express.Router();

router.use("/vehicle", authenticate, authenticateUser, vehicleRouter);
router.use("/driver", authenticate, authenticateUser, driverRouter);
router.use("/user", userRouter);
router.use("/receiving", authenticate, authenticateUser, receivingRouter);
router.use("/warehouse", authenticate, authenticateUser, warehouseRouter);
router.use("/warehouseLoc", authenticate, authenticateUser, warehouseLocRouter);
router.use("/fuelLogs", authenticate, authenticateUser, fuelLogRouter);
export default router;
