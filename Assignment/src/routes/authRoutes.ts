import { Router } from "express";
import { register, login, logout, refreshAccessToken } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshAccessToken', refreshAccessToken);
router.post('/logout', logout);

export default router;