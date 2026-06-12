import { Router } from "express";

import { getAllUsers, getUserById, getMe, } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// GET CURRENT USER
router.get("/me", protect, getMe);
// GET ALL USERS
router.get("/", protect, getAllUsers);
// GET USER BY ID
router.get("/:id", protect, getUserById);

export default router;