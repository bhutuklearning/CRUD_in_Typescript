import { Router } from 'express';
import { register, login, logout, refreshAccessToken } from '../controllers/authController.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/refreshAccessToken', refreshAccessToken);
router.post('/logout', logout);

export default router;