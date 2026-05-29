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

    // Sign and return JWT
    // const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '7d' });

    // res.json({ token });
    const token = jwt.sign(
        { userId: user.id },
        secret,
        { expiresIn: "7d" }
    );

    // Store token inside cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
        message: "Login successful",
    });
};

// POST /api/auth/logout
export const logout = async (
    _req: Request,
    res: Response
): Promise<void> => {

    res.clearCookie("token");

    res.json({
        message: "Logged out successfully",
    });
};