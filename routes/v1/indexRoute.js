import express from "express";
import vehicleRouter from "../../routes/v1/vehicle.routes.js";
import driverRouter from "../../routes/v1/driver.routes.js";
import userRouter from "../../routes/v1/user.router.js";
import maintenanceRouter from "../../routes/v1/maintenance.routes.js";
import receivingRouter from "../../routes/v1/receiving.routes.js";
import warehouseRouter from "../../routes/v1/warehouse.router.js";
import warehouseLocRouter from "../../routes/v1/warehouseLoc.router.js";
import { authenticate, authenticateUser } from "../../middleware/auth.js";

const router = express.Router();

router.use("/vehicle", authenticate, vehicleRouter);
router.use("/driver", authenticate, driverRouter);
router.use("/maintenance", authenticate, maintenanceRouter);
router.use("/user", userRouter);
router.use("/receiving", authenticate, receivingRouter);
router.use("/warehouse", authenticate, warehouseRouter);
router.use("/warehouseLoc", authenticate, warehouseLocRouter);
export default router;
