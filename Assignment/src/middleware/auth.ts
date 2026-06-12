import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express's Request type to carry userId
export interface AuthRequest extends Request {
    userId?: number;
}

export const protect = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const secret = process.env['ACCESS_TOKEN_SECRET'];
        if (!secret) throw new Error('ACCESS_TOKEN_SECRET not set in environment');
        const decoded = jwt.verify(token, secret) as {
            userId: number;
        };

        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
