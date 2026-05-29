import rateLimit from "express-rate-limit";

// GENERAL API LIMITER
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests

    message: {
        message: "Too many requests, please try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});

// STRICT AUTH LIMITER
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // only 10 login/register attempts
    message: {
        message: "Too many auth attempts. Please try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});