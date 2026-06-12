import { Router } from "express";

import {
    fastRoute,
    slowRoute,
    cpuHeavyRoute,
    dbHeavyRoute,
} from "../controllers/performanceController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/fast", protect, fastRoute);
router.get("/slow", protect, slowRoute);
router.get("/cpu-heavy", protect, cpuHeavyRoute);
router.get("/db-heavy", protect, dbHeavyRoute);

export default router;