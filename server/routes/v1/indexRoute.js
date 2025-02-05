import express from "express";
import vehicleRouter from "../../routes/v1/vehicle.routes.js";
import driverRouter from "../../routes/v1/driver.routes.js";
import userRouter from "../../routes/v1/user.router.js";
import maintenanceRouter from "../../routes/v1/maintenance.routes.js";
import { protectRoute } from "../../middleware/authMiddleware.js";
import receivingRouter from "../../routes/v1/receiving.routes.js";
import warehouseRouter from "../../routes/v1/warehouse.router.js";
import warehouseLocRouter from "../../routes/v1/warehouseLoc.router.js";

const router = express.Router();

router.use("/vehicle", protectRoute, vehicleRouter);
router.use("/driver", protectRoute, driverRouter);
router.use("/maintenance", protectRoute, maintenanceRouter);
router.use("/user", protectRoute, userRouter);
router.use("/receiving", protectRoute, receivingRouter);
router.use("/warehouse", protectRoute, warehouseRouter);
router.use("/warehouseLoc", protectRoute, warehouseLocRouter);
export default router;
