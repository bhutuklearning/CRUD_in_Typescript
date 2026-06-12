import { Router } from "express";

import {
    fastRoute,
    slowRoute,
    cpuHeavyRoute,
    // dbHeavyRoute,
} from "../controllers/performanceController.js";

const router = Router();

router.get("/fast", fastRoute);
router.get("/slow", slowRoute);
router.get("/cpu-heavy", cpuHeavyRoute);

// router.get("/db-heavy", dbHeavyRoute);
export default router;