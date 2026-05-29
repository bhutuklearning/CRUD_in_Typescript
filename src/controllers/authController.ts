import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

// POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string };

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        res.status(400).json({ message: 'Email already in use' });
        return;
    }

    // Hash password before saving
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email, password: hashed },
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
};

// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as { email: string; password: string };

    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    // Compare submitted password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const secret = process.env['JWT_SECRET'];
    if (!secret) throw new Error('JWT_SECRET not set in environment');

    const accessSecret = process.env['ACCESS_TOKEN_SECRET'];
    const refreshSecret = process.env['REFRESH_TOKEN_SECRET'];

    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT secrets missing");
    }

    // SHORT-LIVED ACCESS TOKEN
    const accessToken = jwt.sign(
        { userId: user.id },
        accessSecret,
        { expiresIn: "15m" }
    );

    // LONG-LIVED REFRESH TOKEN
    const refreshToken = jwt.sign(
        { userId: user.id },
        refreshSecret,
        { expiresIn: "7d" }
    );

    // Store access token
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    // Store refresh token
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
        message: "Login successful",
    });
};

// POST /api/auth/refreshAccessToken
export const refreshAccessToken = async (
    req: Request,
    res: Response
): Promise<void> => {

    const refreshToken =
        req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({
            message: "Refresh token missing",
        });
        return;
    }

    try {
        const refreshSecret =
            process.env['REFRESH_TOKEN_SECRET'];

        if (!refreshSecret) {
            throw new Error("Missing refresh secret");
        }

        const decoded = jwt.verify(
            refreshToken,
            refreshSecret
        ) as {
            userId: number;
        };

        const accessSecret =
            process.env['ACCESS_TOKEN_SECRET'];

        if (!accessSecret) {
            throw new Error("Missing access secret");
        }

        // CREATE NEW ACCESS TOKEN
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            accessSecret,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env['NODE_ENV'] === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.json({
            message: "Access token refreshed",
        });

    } catch {
        res.status(401).json({
            message: "Invalid refresh token",
        });

    }
};

// POST /api/auth/logout
export const logout = async (
    _req: Request,
    res: Response
): Promise<void> => {

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({
        message: "Logged out successfully",
    });
};