import { Router } from 'express';
import { register, login, logout, refreshAccessToken } from '../controllers/authController.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../validators/authSchemas.js';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refreshAccessToken', refreshAccessToken);
router.post('/logout', logout);

export default router;